import { useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { useToast } from '../../hooks/use-toast';
import { Send, Loader2, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from '../../config/contact';

/* ── Validation helpers ─────────────────────────────────────────────────── */
const REGEX_EMAIL = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const REGEX_PHONE = /^(?:\+91|91|0)?[6-9]\d{9}$/;

function sanitize(str: string): string {
  return str.trim().replace(/[<>"'&]/g, (c) => {
    const map: Record<string, string> = { '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '&': '&amp;' };
    return map[c] ?? c;
  });
}

interface FormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
  // honeypot — must remain empty
  website: string;
}

interface FieldErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

const RATE_LIMIT_MS = 30_000; // 30-second cooldown

export function ContactForm() {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type');
  const nameParam = searchParams.get('name');
  const categoryParam = searchParams.get('category');
  const descParam = searchParams.get('desc');

  const brochuresParam = searchParams.get('brochures');

  const BROCHURE_LABELS: Record<string, string> = {
    afps: 'AFPS Products Brochure (Automatic Fire Detection & Suppression Systems catalogue)',
    general: 'Safety and security devices for HEMMs (Catalogue)',
  };

  let initialMessage = '';
  if (typeParam === 'brochure' && brochuresParam) {
    const requested = brochuresParam
      .split(',')
      .map(id => BROCHURE_LABELS[id.trim()])
      .filter(Boolean);
    const listLines = requested.map(label => `  • ${label}`).join('\n');
    initialMessage = [
      `Enquiry Type: Brochure Request`,
      ``,
      `Hello AEI Team,`,
      ``,
      `I would like to request the following brochure(s):`,
      listLines,
      ``,
      `Please send them to my email address at your earliest convenience.`,
      ``,
      `Thank you.`,
    ].join('\n');
  } else if (typeParam && nameParam) {
    const typeLabel = typeParam.toLowerCase() === 'product' ? 'Product' : 'Project';
    if (typeLabel === 'Product') {
      initialMessage = [
        `Enquiry Type: Product Interest`,
        `Product Name: ${nameParam}`,
        categoryParam ? `Category: ${categoryParam}` : null,
        ``,
        `Hello AEI Team,`,
        ``,
        `I am interested in the "${nameParam}" product and would like to request a quote.`,
        descParam ? `\nProduct Overview:\n${descParam}` : null,
        ``,
        `Please provide detailed specifications, pricing, availability, and installation support information at your earliest convenience.`,
        ``,
        `Thank you.`,
      ].filter((l) => l !== null).join('\n');
    } else {
      initialMessage = `Enquiry Type: Project Consultation\nProject Name: ${nameParam}\n\nHello AEI Team,\n\nI was reviewing the "${nameParam}" project and I am interested in a similar solution for my requirements. Please contact me to discuss this further.\n\nThank you.`;
    }
  }



  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastSubmitRef = useRef<number>(0);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    phone: '',
    email: '',
    message: initialMessage,
    website: '', // honeypot
  });
  const [errors, setErrors] = useState<FieldErrors>({});

  /* ── Start rate-limit countdown ── */
  const startCooldown = useCallback(() => {
    const end = Date.now() + RATE_LIMIT_MS;
    lastSubmitRef.current = Date.now();

    const tick = () => {
      const remaining = Math.ceil((end - Date.now()) / 1000);
      if (remaining > 0) {
        setCooldown(remaining);
      } else {
        setCooldown(0);
        if (cooldownRef.current) clearInterval(cooldownRef.current);
      }
    };
    tick();
    cooldownRef.current = setInterval(tick, 1000);
  }, []);

  /* ── Field-level validation ── */
  const validate = useCallback((data: FormData): FieldErrors => {
    const errs: FieldErrors = {};

    const name = sanitize(data.name);
    if (!name) errs.name = 'Full name is required.';
    else if (name.length > 100) errs.name = 'Name is too long (max 100 chars).';

    const phone = sanitize(data.phone);
    if (!phone) errs.phone = 'Phone number is required.';
    else if (!REGEX_PHONE.test(phone.replace(/\s/g, '')))
      errs.phone = 'Enter a valid Indian mobile number.';

    const email = sanitize(data.email);
    if (email && !REGEX_EMAIL.test(email))
      errs.email = 'Enter a valid email address.';

    const message = sanitize(data.message);
    if (!message) errs.message = 'Please describe your requirements.';
    else if (message.length > 2000) errs.message = 'Message too long (max 2000 chars).';

    return errs;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on edit
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /* ── Honeypot check ── */
    if (formData.website.length > 0) {
      // Bot detected — silently succeed
      toast({ title: 'Message sent!', description: 'Thank you, we will be in touch.' });
      return;
    }

    /* ── Rate limiting ── */
    if (cooldown > 0) {
      toast({
        title: 'Please wait',
        description: `You can submit again in ${cooldown} seconds.`,
        variant: 'destructive',
      });
      return;
    }

    /* ── Client validation ── */
    const fieldErrors = validate(formData);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const s = {
        name:    sanitize(formData.name),
        company: sanitize(formData.company),
        phone:   sanitize(formData.phone),
        email:   sanitize(formData.email),
        message: sanitize(formData.message),
      };

      // ── 1. WhatsApp deep-link ─────────────────────────────────────────
      const waText = [
        `*New Enquiry — AEI (AFPS DIVN)*`,
        ``,
        `*Name:* ${s.name}`,
        s.company ? `*Company:* ${s.company}` : null,
        `*Phone:* ${s.phone}`,
        s.email ? `*Email:* ${s.email}` : null,
        ``,
        `*Message:*`,
        s.message,
      ].filter(Boolean).join('\n');

      const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(waText)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      // ── 2. Mailto fallback ────────────────────────────────────────────
      const mailSubject = `AEI (AFPS DIVN) Enquiry — ${s.name}${s.company ? ` (${s.company})` : ''}`;
      const mailBody = [
        `Name: ${s.name}`,
        s.company ? `Company: ${s.company}` : null,
        `Phone: ${s.phone}`,
        s.email ? `Email: ${s.email}` : null,
        ``,
        `Message:`,
        s.message,
      ].filter(Boolean).join('\n');

      const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
      // Short delay so WhatsApp tab opens first
      setTimeout(() => { window.location.href = mailtoUrl; }, 800);

      toast({
        title: '✅ Enquiry Sent!',
        description: 'WhatsApp opened for you. Your email client will open shortly.',
      });

      setSubmitted(true);
      setFormData({ name: '', company: '', phone: '', email: '', message: '', website: '' });
      setErrors({});
      startCooldown();

    } catch (err) {
      toast({
        title: 'Submission Failed',
        description: 'Something went wrong. Please try again or call us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Success state ── */
  if (submitted && cooldown > 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
        <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="font-heading text-xl font-semibold text-foreground">Message Received!</h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          We've received your enquiry and will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-2 text-flame-orange text-sm font-medium hover:underline flex items-center gap-1"
          disabled={cooldown > 0}
        >
          {cooldown > 0 ? (
            <>
              <Clock className="h-3.5 w-3.5" />
              Send another in {cooldown}s
            </>
          ) : 'Send another message'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* ── Honeypot (hidden from real users, bots fill it) ── */}
      <div className="absolute -top-[9999px] -left-[9999px] aria-hidden" aria-hidden="true" tabIndex={-1}>
        <label htmlFor="website">Leave this empty</label>
        <input
          id="website"
          name="website"
          type="text"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name + Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-sm font-medium">
            Full Name <span className="text-flame-crimson">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Mallikarjun"
            maxLength={100}
            className={errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-xs flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="company" className="text-sm font-medium">Company Name <span className="text-flame-crimson">*</span></Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="ABC Mining Co."
            className={errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}
            maxLength={100}
          />
        </div>
      </div>

      {/* Phone + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone Number <span className="text-flame-crimson">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 79953 28191"
            maxLength={15}
            className={errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''}
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-xs flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.phone}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium">Email Address <span className="text-flame-crimson">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
            value={formData.email}
            onChange={handleChange}
            placeholder="Mallikarjun@example.com"
            maxLength={200}
          />
          {errors.email && (
            <p className="text-red-500 text-xs flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <Label htmlFor="message" className="text-sm font-medium">
          Your Message <span className="text-flame-crimson">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your requirements, machinery type, and quantity needed..."
          rows={10}
          maxLength={7000}
          className={errors.message ? 'border-red-500 focus-visible:ring-red-500' : ''}
          required
        />
        <div className="flex justify-between">
          {errors.message ? (
            <p className="text-red-500 text-xs flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.message}
            </p>
          ) : <span />}
          <p className="text-muted-foreground/60 text-xs ml-auto">
            {formData.message.length}/7000
          </p>
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting || cooldown > 0}
        className="w-full sm:w-auto bg-gradient-flame border-0 text-white font-semibold px-8 py-3 rounded-xl shadow-flame hover:shadow-glow hover:scale-105 active:scale-100 transition-all duration-200 disabled:opacity-60 disabled:hover:scale-100"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : cooldown > 0 ? (
          <>
            <Clock className="mr-2 h-5 w-5" />
            Wait {cooldown}s
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            Submit Enquiry
          </>
        )}
      </Button>

      <p className="text-muted-foreground/60 text-xs">
        <span className="text-flame-crimson">*</span> Required fields. Your data is handled securely and never shared.
      </p>
    </form>
  );
}
