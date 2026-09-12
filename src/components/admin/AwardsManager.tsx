import { useState } from 'react';
import { useAwards, useAddAward, useUpdateAward, useDeleteAward } from '../../lib/store';
import { Award } from '../../types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Pencil, Trash2, Plus, GripVertical } from 'lucide-react';
import { toast } from 'sonner';
import { ImageUpload } from './ImageUpload';

export default function AwardsManager() {
  const { data: awards, isLoading } = useAwards();
  const addAward = useAddAward();
  const updateAward = useUpdateAward();
  const deleteAward = useDeleteAward();

  const [isOpen, setIsOpen] = useState(false);
  const [editingAward, setEditingAward] = useState<Award | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    year: '',
    sort_order: 0,
  });

  const handleOpenDialog = (award?: Award) => {
    if (award) {
      setEditingAward(award);
      setFormData({
        title: award.title,
        description: award.description,
        image_url: award.image_url,
        year: award.year || '',
        sort_order: award.sort_order,
      });
    } else {
      setEditingAward(null);
      setFormData({
        title: '',
        description: '',
        image_url: '',
        year: '',
        sort_order: awards ? awards.length : 0,
      });
    }
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAward) {
        await updateAward.mutateAsync({
          ...editingAward,
          ...formData,
        });
        toast.success('Award updated successfully');
      } else {
        await addAward.mutateAsync(formData);
        toast.success('Award added successfully');
      }
      setIsOpen(false);
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this award?')) {
      try {
        await deleteAward.mutateAsync(id);
        toast.success('Award deleted successfully');
      } catch (error) {
        toast.error('Failed to delete award');
        console.error(error);
      }
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading awards...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold font-heading text-foreground">Awards &amp; Achievements</h2>
          <p className="text-sm text-muted-foreground">Manage the awards displayed on the About Us page.</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="bg-flame-crimson hover:bg-flame-crimson/90 text-white self-start sm:self-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Award
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
            <DialogHeader>
              <DialogTitle>{editingAward ? 'Edit Award' : 'Add Award'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Title</label>
                  <Input
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Best Safety Equipment Provider"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Year</label>
                  <Input
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="e.g. 2023"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Description</label>
                  <Textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the award..."
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Award Image</label>
                  <ImageUpload 
                    value={formData.image_url} 
                    onChange={(url) => setFormData({...formData, image_url: url})} 
                    onRemove={() => setFormData({...formData, image_url: ''})}
                    folder="awards"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Sort Order</label>
                  <Input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={addAward.isPending || updateAward.isPending} className="bg-flame-crimson hover:bg-flame-crimson/90 text-white">
                  {editingAward ? 'Save Changes' : 'Add Award'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {awards?.map((award) => (
          <div key={award.id} className="bg-card border border-border/50 rounded-xl overflow-hidden hover:border-flame-crimson/30 transition-colors shadow-sm">
            <div className="aspect-video relative overflow-hidden bg-muted flex items-center justify-center p-4">
              {award.image_url ? (
                <img
                  src={award.image_url}
                  alt={award.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-muted-foreground text-sm">No image</span>
              )}
            </div>
            <div className="p-3">
              <div className="flex justify-between items-start gap-2 mb-1.5">
                <h3 className="font-semibold text-foreground text-sm line-clamp-2 flex-1">{award.title}</h3>
                {award.year && (
                  <span className="text-xs font-medium bg-flame-crimson/10 text-flame-crimson px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                    {award.year}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{award.description}</p>
              {/* Always-visible action buttons for mobile */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <GripVertical className="h-3 w-3" />
                  Order: {award.sort_order}
                </div>
                <div className="flex gap-1.5">
                  <Button size="icon" variant="outline" className="h-7 w-7 rounded-lg" onClick={() => handleOpenDialog(award)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="icon" variant="destructive" className="h-7 w-7 rounded-lg" onClick={() => handleDelete(award.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {awards?.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-border rounded-xl">
            <p className="text-muted-foreground">No awards added yet.</p>
            <Button variant="link" onClick={() => handleOpenDialog()} className="text-flame-crimson">
              Add your first award
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
