import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from './supabase';
import { Product, Project, TestimonialLogo, Award } from '../types';

// ── Awards ──────────────────────────────────────────────────────────────────

export const useAwards = () => {
  return useQuery({
    queryKey: ['awards'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('awards')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return (data || []) as Award[];
    },
  });
};

export const useAddAward = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (award: Omit<Award, 'id' | 'created_at'>) => {
      const { error } = await supabase.from('awards').insert(award);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['awards'] });
    },
  });
};

export const useUpdateAward = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (award: Award) => {
      const { error } = await supabase
        .from('awards')
        .update({
          title: award.title,
          description: award.description,
          image_url: award.image_url,
          year: award.year,
          sort_order: award.sort_order,
        })
        .eq('id', award.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['awards'] });
    },
  });
};

export const useDeleteAward = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('awards').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['awards'] });
    },
  });
};

// ── Products ────────────────────────────────────────────────────────────────

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      
      const dbProducts = (data || []).map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        category: p.category,
        imageUrl: p.image_url,
        features: p.features,
      })) as Product[];

      const staticProducts: Product[] = [];

      // Only append if they don't already exist in the DB
      const mergedProducts = [...dbProducts];
      staticProducts.forEach(sp => {
        if (!mergedProducts.some(p => p.id === sp.id)) {
          mergedProducts.push(sp);
        }
      });

      return mergedProducts;
    },
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: Product) => {
      const { error } = await supabase.from('products').insert({
        id: product.id,
        title: product.title,
        description: product.description,
        category: product.category,
        image_url: product.imageUrl,
        features: product.features || [],
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: Product) => {
      const { error } = await supabase.from('products').update({
        title: product.title,
        description: product.description,
        category: product.category,
        image_url: product.imageUrl,
        features: product.features || [],
      }).eq('id', product.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

// ── Projects ────────────────────────────────────────────────────────────────

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase.from('projects').select('*');
      if (error) throw error;
      
      return (data || []).map((p: any) => ({
        id: p.id,
        title: p.title,
        client: p.client,
        location: p.location,
        date: p.date,
        machineryType: p.machinery_type,
        units: p.units,
        description: p.description,
        challenge: p.challenge,
        solution: p.solution,
        advantages: p.advantages || [],
        tags: p.tags || [],
        coverImage: p.cover_image,
        photos: p.photos || [],
      })) as Project[];
    },
  });
};

export const useAddProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (project: Project) => {
      const { error } = await supabase.from('projects').insert({
        id: project.id,
        title: project.title,
        client: project.client,
        location: project.location,
        date: project.date,
        machinery_type: project.machineryType,
        units: project.units,
        description: project.description,
        challenge: project.challenge,
        solution: project.solution,
        advantages: project.advantages || [],
        tags: project.tags || [],
        cover_image: project.coverImage,
        photos: project.photos || [],
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (project: Project) => {
      const { error } = await supabase.from('projects').update({
        title: project.title,
        client: project.client,
        location: project.location,
        date: project.date,
        machinery_type: project.machineryType,
        units: project.units,
        description: project.description,
        challenge: project.challenge,
        solution: project.solution,
        advantages: project.advantages || [],
        tags: project.tags || [],
        cover_image: project.coverImage,
        photos: project.photos || [],
      }).eq('id', project.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

// ── Testimonial Logos ────────────────────────────────────────────────────────

export const useTestimonialLogos = () => {
  return useQuery({
    queryKey: ['testimonial_logos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonial_logos')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return (data || []) as TestimonialLogo[];
    },
  });
};

export const useAddTestimonialLogo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (logo: Omit<TestimonialLogo, 'id' | 'created_at'>) => {
      const { error } = await supabase.from('testimonial_logos').insert(logo);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonial_logos'] });
    },
  });
};

export const useUpdateTestimonialLogo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (logo: TestimonialLogo) => {
      const { error } = await supabase
        .from('testimonial_logos')
        .update({ name: logo.name, image_url: logo.image_url, sort_order: logo.sort_order })
        .eq('id', logo.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonial_logos'] });
    },
  });
};

export const useDeleteTestimonialLogo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('testimonial_logos').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonial_logos'] });
    },
  });
};
