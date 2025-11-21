'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StoreVisitsTable } from './components/StoreVisitsTable';
import { StoreVisitForm } from './components/StoreVisitForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusIcon, RefreshCwIcon } from 'lucide-react';
import axios from 'axios';

export default function StoreVisitsPage() {
  const [storeVisits, setStoreVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editingVisit, setEditingVisit] = useState(null);
  const router = useRouter();

  const fetchStoreVisits = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/store-visits');
      setStoreVisits(response.data);
    } catch (error) {
      console.error('Failed to fetch store visits:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreVisits();
  }, []);

  const handleCreate = () => {
    setEditingVisit(null);
    setOpenForm(true);
  };

  const handleEdit = (visit) => {
    setEditingVisit(visit);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/store-visits/${id}`);
      fetchStoreVisits();
    } catch (error) {
      console.error('Failed to delete store visit:', error);
    }
  };

  const handleFormSuccess = () => {
    setOpenForm(false);
    fetchStoreVisits();
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Store Visit Testing Status</CardTitle>
          <div className="flex space-x-2">
            <Button onClick={fetchStoreVisits} variant="outline" size="sm">
              <RefreshCwIcon className="h-4 w-4" />
            </Button>
            <Dialog open={openForm} onOpenChange={setOpenForm}>
              <DialogTrigger asChild>
                <Button onClick={handleCreate} size="sm">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Visit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingVisit ? 'Edit Store Visit' : 'Add New Store Visit'}</DialogTitle>
                </DialogHeader>
                <StoreVisitForm 
                  visit={editingVisit} 
                  onSuccess={handleFormSuccess}
                  onCancel={() => setOpenForm(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <StoreVisitsTable 
            storeVisits={storeVisits} 
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
}