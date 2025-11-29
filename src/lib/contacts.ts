import { supabase } from './supabaseClient';

export type ContactInput = {
  fullName: string;
  email: string;
  phoneNumber: string;
  notes?: string;
};

export type Contact = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  notes: string | null;
  createdAt: string;
};

export async function saveContact(input: ContactInput) {
  if (!supabase) return { error: 'Supabase is not configured. Check .env.local.' };
  const { fullName, email, phoneNumber, notes } = input;
  const { data, error } = await supabase
    .from('contacts')
    .insert({
      full_name: fullName,
      email,
      phone_number: phoneNumber,
      notes: notes && notes.trim() !== '' ? notes : null,
    })
    .select('id, full_name, email, phone_number, notes, created_at')
    .single();

  if (error) return { error: error.message };
  if (!data) return { error: 'No data returned from insert.' };

  const contact: Contact = {
    id: data.id,
    fullName: data.full_name,
    email: data.email,
    phoneNumber: data.phone_number,
    notes: data.notes,
    createdAt: data.created_at,
  };
  return { contact };
}

export async function getContacts() {
  if (!supabase) return { contacts: [], error: 'Supabase is not configured. Check .env.local.' };
  const { data, error } = await supabase
    .from('contacts')
    .select('id, full_name, email, phone_number, notes, created_at')
    .order('created_at', { ascending: false });

  if (error) return { contacts: [], error: error.message };
  type Row = { id: string; full_name: string; email: string; phone_number: string; notes: string | null; created_at: string };
  const contacts: Contact[] = ((data as Row[] | null) || []).map((row) => ({
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phoneNumber: row.phone_number,
    notes: row.notes,
    createdAt: row.created_at,
  }));
  return { contacts };
}
