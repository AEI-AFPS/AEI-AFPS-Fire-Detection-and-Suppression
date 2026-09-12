import { useState } from 'react';
import { useProjects, useAddProject, useUpdateProject, useDeleteProject } from '../../lib/store';
import { Project } from '../../types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Loader2, Plus, Edit2, Trash2, X } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { ImageUpload } from './ImageUpload';
import { ScrollArea } from '../ui/scroll-area';

export default function ProjectsManager() {
  const { data: projects, isLoading, error } = useProjects();
  const addMutation = useAddProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();
  const { toast } = useToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<Project>>({
    id: '', title: '', client: '', location: '', date: '', machineryType: '',
    units: 0, description: '', challenge: '', solution: '', 
    advantages: [], tags: [], coverImage: '/placeholder.svg', photos: [], sections: []
  });

  const [advantageInput, setAdvantageInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  const handleOpenForm = (project?: Project) => {
    if (project) {
      setEditingId(project.id);
      setFormData({ ...project });
    } else {
      setEditingId(null);
      setFormData({ 
        id: `proj-${Date.now()}`, title: '', client: '', location: '', date: new Date().getFullYear().toString(), 
        machineryType: '', units: 0, description: '', challenge: '', solution: '', 
        advantages: [], tags: [], coverImage: '/placeholder.svg', photos: [], sections: []
      });
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  const addArrayItem = (field: 'advantages' | 'tags', input: string, setInput: (v: string) => void) => {
    if (input.trim()) {
      setFormData(prev => ({ ...prev, [field]: [...(prev[field] as string[] || []), input.trim()] }));
      setInput('');
    }
  };

  const removeArrayItem = (field: 'advantages' | 'tags', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[])?.filter((_, i) => i !== index)
    }));
  };

  const addPhoto = (url: string) => {
    setFormData(prev => ({ ...prev, photos: [...(prev.photos || []), url] }));
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({ ...prev, photos: (prev.photos || []).filter((_, i) => i !== index) }));
  };

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...(prev.sections || []), { title: '', content: '' }]
    }));
  };

  const updateSection = (index: number, field: 'title' | 'content', value: string) => {
    setFormData(prev => {
      const newSections = [...(prev.sections || [])];
      newSections[index] = { ...newSections[index], [field]: value };
      return { ...prev, sections: newSections };
    });
  };

  const removeSection = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sections: (prev.sections || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMutation.mutateAsync(formData as Project);
        toast({ title: 'Project updated successfully' });
      } else {
        await addMutation.mutateAsync(formData as Project);
        toast({ title: 'Project added successfully' });
      }
      handleCloseForm();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteMutation.mutateAsync(id);
        toast({ title: 'Project deleted' });
      } catch (err: any) {
        toast({ title: 'Error deleting project', description: err.message, variant: 'destructive' });
      }
    }
  };

  if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="h-8 w-8 animate-spin text-flame-orange" /></div>;
  if (error) return <div className="text-red-500">Error loading projects: {(error as any).message}</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h2 className="font-heading text-xl sm:text-2xl">Projects (Case Studies)</h2>
        <Button onClick={() => handleOpenForm()} className="bg-gradient-flame text-white hover:scale-105 transition-transform border-0 self-start sm:self-auto">
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </Button>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto p-0 flex flex-col">
          <DialogHeader className="p-6 pb-2 border-b sticky top-0 bg-background z-20">
            <DialogTitle>{editingId ? 'Edit Project' : 'New Project'}</DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 p-6">
            <form id="project-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5"><Label>Project ID</Label><Input value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} disabled={!!editingId} required /></div>
                <div className="space-y-1.5"><Label>Title</Label><Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required /></div>
                <div className="space-y-1.5"><Label>Client</Label><Input value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} required /></div>
                <div className="space-y-1.5"><Label>Location</Label><Input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required /></div>
                <div className="space-y-1.5"><Label>Date / Year</Label><Input value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required /></div>
                <div className="space-y-1.5"><Label>Machinery Type</Label><Input value={formData.machineryType} onChange={e => setFormData({...formData, machineryType: e.target.value})} required /></div>
                <div className="space-y-1.5"><Label>Units Installed</Label><Input type="number" value={formData.units} onChange={e => setFormData({...formData, units: parseInt(e.target.value) || 0})} required /></div>
              </div>

              <div className="space-y-1.5">
                <Label>Cover Image</Label>
                <ImageUpload 
                  value={formData.coverImage} 
                  onChange={(url) => setFormData({...formData, coverImage: url})} 
                  onRemove={() => setFormData({...formData, coverImage: ''})}
                  folder="projects"
                />
              </div>

              <div className="space-y-1.5">
                <Label>Gallery Photos</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {formData.photos?.map((photo, i) => (
                    <div key={i} className="relative aspect-video rounded-md overflow-hidden border group">
                      <img src={photo} alt="Gallery" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removePhoto(i)} className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <div className="col-span-1">
                    <ImageUpload 
                      onUploadMultiple={(urls) => {
                        setFormData(prev => ({ ...prev, photos: [...(prev.photos || []), ...urls] }));
                      }}
                      folder="projects"
                      multiple={true}
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1.5"><Label>Summary Description</Label><Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={5} className="min-h-[120px]" required /></div>
                <div className="space-y-1.5"><Label>The Challenge</Label><Textarea value={formData.challenge} onChange={e => setFormData({...formData, challenge: e.target.value})} rows={5} className="min-h-[120px]" required /></div>
                <div className="space-y-1.5"><Label>Our Solution</Label><Textarea value={formData.solution} onChange={e => setFormData({...formData, solution: e.target.value})} rows={5} className="min-h-[120px]" required /></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tags (e.g. Mining, Heavy Duty)</Label>
                  <div className="flex gap-2">
                    <Input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if(e.key === 'Enter') { e.preventDefault(); addArrayItem('tags', tagInput, setTagInput); } }} />
                    <Button type="button" variant="outline" onClick={() => addArrayItem('tags', tagInput, setTagInput)}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.tags?.map((t, i) => (
                      <span key={i} className="bg-background border px-2 py-1 rounded text-xs flex items-center">{t} <button type="button" onClick={() => removeArrayItem('tags', i)} className="ml-1 text-red-500"><X className="h-3 w-3"/></button></span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Key Advantages / Results</Label>
                  <div className="flex gap-2">
                    <Input value={advantageInput} onChange={e => setAdvantageInput(e.target.value)} onKeyDown={e => { if(e.key === 'Enter') { e.preventDefault(); addArrayItem('advantages', advantageInput, setAdvantageInput); } }} />
                    <Button type="button" variant="outline" onClick={() => addArrayItem('advantages', advantageInput, setAdvantageInput)}>Add</Button>
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    {formData.advantages?.map((a, i) => (
                      <div key={i} className="bg-background border px-2 py-1 rounded text-xs flex justify-between items-center">{a} <button type="button" onClick={() => removeArrayItem('advantages', i)} className="text-red-500"><X className="h-3 w-3"/></button></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <Label className="text-lg">Custom Sections</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addSection}>
                    <Plus className="h-4 w-4 mr-2" /> Add Section
                  </Button>
                </div>
                {formData.sections?.map((section, index) => (
                  <div key={index} className="bg-muted/30 p-4 rounded-lg border border-border relative">
                    <button type="button" onClick={() => removeSection(index)} className="absolute top-2 right-2 text-red-500 hover:bg-red-500/10 p-1 rounded-md transition-colors"><X className="w-4 h-4"/></button>
                    <div className="space-y-3 pr-6">
                      <div className="space-y-1.5">
                        <Label>Section Title</Label>
                        <Input value={section.title} onChange={e => updateSection(index, 'title', e.target.value)} placeholder="e.g. Safety Impact" required />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Section Content</Label>
                        <Textarea value={section.content} onChange={e => updateSection(index, 'content', e.target.value)} rows={3} placeholder="Write the details here..." required />
                      </div>
                    </div>
                  </div>
                ))}
                {(!formData.sections || formData.sections.length === 0) && (
                  <div className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-lg">
                    No custom sections added. Click 'Add Section' to append more information blocks.
                  </div>
                )}
              </div>
            </form>
          </div>

          <div className="p-6 border-t bg-muted/10 flex justify-end gap-3 mt-auto sticky bottom-0 z-20 backdrop-blur-sm">
            <Button type="button" variant="outline" onClick={handleCloseForm}>Cancel</Button>
            <Button type="submit" form="project-form" className="bg-gradient-flame text-white border-0" disabled={addMutation.isPending || updateMutation.isPending}>
              {addMutation.isPending || updateMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {editingId ? 'Save Changes' : 'Create Project'}
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
              <th className="p-4 font-semibold">Client</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects?.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No projects found.</td></tr>
            ) : (
              projects?.map(p => (
                <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 whitespace-nowrap">
                  <td className="p-4 font-medium">{p.title}</td>
                  <td className="p-4">{p.client}</td>
                  <td className="p-4 text-muted-foreground">{p.date}</td>
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
