import { useState } from 'react';
import { useProducts, useAddProduct, useUpdateProduct, useDeleteProduct } from '../../lib/store';
import { Product, categories } from '../../types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Loader2, Plus, Edit2, Trash2, X } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { ImageUpload } from './ImageUpload';
import { ScrollArea } from '../ui/scroll-area';

export default function ProductsManager() {
  const { data: products, isLoading, error } = useProducts();
  const addMutation = useAddProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();
  const { toast } = useToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    id: '', title: '', description: '', category: 'fire-detection', imageUrl: '/placeholder.svg', features: []
  });
  const [featureInput, setFeatureInput] = useState('');

  const handleOpenForm = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setFormData({ ...product });
    } else {
      setEditingId(null);
      setFormData({ id: `prod-${Date.now()}`, title: '', description: '', category: 'fire-detection', imageUrl: '/placeholder.svg', features: [] });
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({ ...prev, features: [...(prev.features || []), featureInput.trim()] }));
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMutation.mutateAsync(formData as Product);
        toast({ title: 'Product updated successfully' });
      } else {
        await addMutation.mutateAsync(formData as Product);
        toast({ title: 'Product added successfully' });
      }
      handleCloseForm();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteMutation.mutateAsync(id);
        toast({ title: 'Product deleted' });
      } catch (err: any) {
        toast({ title: 'Error deleting product', description: err.message, variant: 'destructive' });
      }
    }
  };

  if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="h-8 w-8 animate-spin text-flame-orange" /></div>;
  if (error) return <div className="text-red-500">Error loading products: {(error as any).message}</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h2 className="font-heading text-xl sm:text-2xl">Products</h2>
        <Button onClick={() => handleOpenForm()} className="bg-gradient-flame text-white hover:scale-105 transition-transform border-0 self-start sm:self-auto">
          <Plus className="h-4 w-4 mr-2" /> Add Product
        </Button>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto p-0 flex flex-col">
          <DialogHeader className="p-6 pb-2 border-b sticky top-0 bg-background z-20">
            <DialogTitle>{editingId ? 'Edit Product' : 'New Product'}</DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 p-6">
            <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Product ID</Label>
                  <Input value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} disabled={!!editingId} required />
                </div>
                <div className="space-y-1.5">
                  <Label>Title</Label>
                  <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                </div>
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <select 
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    required
                  >
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <Label>Product Cover Image</Label>
                <ImageUpload 
                  value={formData.imageUrl} 
                  onChange={(url) => setFormData({...formData, imageUrl: url})} 
                  onRemove={() => setFormData({...formData, imageUrl: ''})}
                  folder="products"
                />
              </div>
              
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} required />
              </div>

              <div className="space-y-2">
                <Label>Features</Label>
                <div className="flex gap-2">
                  <Input value={featureInput} onChange={e => setFeatureInput(e.target.value)} placeholder="Add a feature..." onKeyDown={e => { if(e.key === 'Enter') { e.preventDefault(); addFeature(); } }} />
                  <Button type="button" variant="outline" onClick={addFeature}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.features?.map((f, i) => (
                    <div key={i} className="flex items-center gap-1 bg-background border px-2 py-1 rounded-md text-sm">
                      {f}
                      <button type="button" onClick={() => removeFeature(i)} className="text-red-500 hover:text-red-700 ml-1"><X className="h-3 w-3" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>
          
          <div className="p-6 border-t bg-muted/10 flex justify-end gap-3 mt-auto sticky bottom-0 z-20 backdrop-blur-sm">
            <Button type="button" variant="outline" onClick={handleCloseForm}>Cancel</Button>
            <Button type="submit" form="product-form" className="bg-gradient-flame text-white border-0" disabled={addMutation.isPending || updateMutation.isPending}>
              {addMutation.isPending || updateMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {editingId ? 'Save Changes' : 'Create Product'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="border border-border/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-sm min-w-[500px]">
          <thead className="bg-muted/50 border-b border-border/50">
            <tr>
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">ID</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No products found.</td></tr>
            ) : (
              products?.map(p => (
                <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 whitespace-nowrap">
                  <td className="p-4 font-medium">{p.title}</td>
                  <td className="p-4">
                    <span className="bg-muted px-2 py-1 rounded text-xs">{categories.find(c => c.id === p.category)?.name || p.category}</span>
                  </td>
                  <td className="p-4 text-muted-foreground font-mono text-xs">{p.id}</td>
                  <td className="p-4 text-right flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenForm(p)}><Edit2 className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-600 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
