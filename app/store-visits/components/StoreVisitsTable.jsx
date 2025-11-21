'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { RefreshCw, Plus, Edit, Trash2 } from 'lucide-react';
import axios from 'axios';
import StoreVisitForm from './StoreVisitForm';

export default function StoreVisitsTable() {
  const [storeVisits, setStoreVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingVisit, setEditingVisit] = useState(null);

  const fetchStoreVisits = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/store-visits');
      setStoreVisits(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch store visits');
      console.error('Error fetching store visits:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreVisits();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/store-visits/${id}`);
      fetchStoreVisits(); // Refresh the list
    } catch (err) {
      setError('Failed to delete store visit');
      console.error('Error deleting store visit:', err);
    }
  };

  const handleEdit = (visit) => {
    setEditingVisit(visit);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingVisit(null);
    fetchStoreVisits();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Store Visit Testing Status</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={fetchStoreVisits}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Visit
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {showForm ? (
          <StoreVisitForm 
            existingVisit={editingVisit} 
            onSuccess={handleFormSuccess} 
            onCancel={() => {
              setShowForm(false);
              setEditingVisit(null);
            }} 
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Store Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Visit Date</TableHead>
                <TableHead>Tester</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {storeVisits.map((visit) => (
                <TableRow key={visit.id}>
                  <TableCell className="font-medium">{visit.store_name}</TableCell>
                  <TableCell>{visit.location}</TableCell>
                  <TableCell>{new Date(visit.visit_date).toLocaleDateString()}</TableCell>
                  <TableCell>{visit.tester_name}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      visit.status === 'passed' 
                        ? 'bg-green-100 text-green-800' 
                        : visit.status === 'failed' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{visit.notes || '-'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEdit(visit)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(visit.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}