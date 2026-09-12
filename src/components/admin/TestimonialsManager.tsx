import { useState } from 'react';
import {
  useTestimonialLogos,
  useAddTestimonialLogo,
  useUpdateTestimonialLogo,
  useDeleteTestimonialLogo,
} from '../../lib/store';
import { TestimonialLogo } from '../../types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Loader2, Plus, Edit2, Trash2, X, GripVertical } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { ImageUpload } from './ImageUpload';

interface FormState {
  name: string;
  image_url: string;
  sort_order: number;
}

const emptyForm = (): FormState => ({
  name: '',
  image_url: '',
  sort_order: 0,
});

export default function TestimonialsManager() {
  const { data: logos, isLoading, error } = useTestimonialLogos();
  const addMutation = useAddTestimonialLogo();
  const updateMutation = useUpdateTestimonialLogo();
  const deleteMutation = useDeleteTestimonialLogo();
  const { toast } = useToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormState>(emptyForm());

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ ...emptyForm(), sort_order: (logos?.length ?? 0) + 1 });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (logo: TestimonialLogo) => {
    setEditingId(logo.id);
    setFormData({ name: logo.name, image_url: logo.image_url, sort_order: logo.sort_order });
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData(emptyForm());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image_url) {
      toast({ title: 'Please upload a logo image', variant: 'destructive' });
      return;
    }
    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...formData });
        toast({ title: 'Logo updated successfully' });
      } else {
        await addMutation.mutateAsync(formData);
        toast({ title: 'Logo added successfully' });
      }
      handleClose();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Remove "${name}" from the testimonials bar?`)) {
      try {
        await deleteMutation.mutateAsync(id);
        toast({ title: 'Logo removed' });
      } catch (err: any) {
        toast({ title: 'Error', description: err.message, variant: 'destructive' });
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="h-8 w-8 animate-spin text-flame-orange" />
      </div>
    );
  if (error)
    return <div className="text-red-500">Error loading logos: {(error as any).message}</div>;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="font-heading text-xl sm:text-2xl">Client / Testimonial Logos</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage the logos displayed in the "Trusted by Industry Leaders" marquee.
          </p>
        </div>
        <Button
          onClick={handleOpenAdd}
          className="bg-gradient-flame text-white hover:scale-105 transition-transform border-0 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Logo
        </Button>
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Logo' : 'Add Logo'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-5 pt-2">
            <div className="space-y-1.5">
              <Label>Client / Brand Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. BEML, TATA, SAIL…"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label>Display Order</Label>
              <Input
                type="number"
                min={1}
                value={formData.sort_order}
                onChange={(e) =>
                  setFormData({ ...formData, sort_order: parseInt(e.target.value) || 1 })
                }
              />
            </div>

            <div className="space-y-1.5">
              <Label>Logo Image</Label>
              <ImageUpload
                value={formData.image_url}
                onChange={(url) => setFormData({ ...formData, image_url: url })}
                onRemove={() => setFormData({ ...formData, image_url: '' })}
                folder="testimonials"
              />
              <p className="text-xs text-muted-foreground">
                Use PNG/SVG with transparent background for best results.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-flame text-white border-0"
                disabled={addMutation.isPending || updateMutation.isPending}
              >
                {addMutation.isPending || updateMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                {editingId ? 'Save Changes' : 'Add Logo'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Logo Grid */}
      {logos && logos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="relative border border-border/50 rounded-xl bg-muted/20 p-3 flex flex-col items-center gap-2 hover:border-flame-orange/40 hover:bg-muted/40 transition-all"
            >
              {/* Logo image */}
              <div className="w-full h-12 flex items-center justify-center">
                <img
                  src={logo.image_url}
                  alt={logo.name}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://placehold.co/120x60/1e293b/94a3b8?text=Logo';
                  }}
                />
              </div>

              {/* Name */}
              <p className="text-xs font-medium text-center text-foreground/80 leading-tight truncate w-full">
                {logo.name}
              </p>

              {/* Sort badge */}
              <span className="absolute top-1.5 left-1.5 text-[10px] bg-muted border border-border/50 px-1.5 py-0.5 rounded text-muted-foreground">
                #{logo.sort_order}
              </span>

              {/* Action buttons — always visible on mobile */}
              <div className="flex gap-1 mt-1">
                <button
                  onClick={() => handleOpenEdit(logo)}
                  className="bg-background border border-border/60 text-foreground hover:bg-muted p-1.5 rounded-md transition-colors"
                  title="Edit"
                >
                  <Edit2 className="h-3 w-3" />
                </button>
                <button
                  onClick={() => handleDelete(logo.id, logo.name)}
                  className="bg-background border border-border/60 text-red-500 hover:bg-red-500/10 p-1.5 rounded-md transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-border rounded-xl p-12 text-center text-muted-foreground">
          <p className="text-sm">No logos added yet.</p>
          <p className="text-xs mt-1">
            Click <strong>Add Logo</strong> to upload your first client logo.
          </p>
        </div>
      )}
    </div>
  );
}
