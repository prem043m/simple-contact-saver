import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Contact {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  notes: string;
}

const Index = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    notes: "",
  });

  const saveContact = (data: typeof formData) => {
    const newContact: Contact = {
      id: Date.now().toString(),
      ...data,
    };
    setContacts((prev) => [...prev, newContact]);
  };

  const getContacts = () => {
    return contacts;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveContact(formData);
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      notes: "",
    });
    getContacts();
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Contact Book</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  required
                />
              </div>
              <div>
                <Textarea
                  placeholder="Notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">
                Save Contact
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Saved Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            {contacts.length === 0 ? (
              <p className="text-muted-foreground">No contacts saved yet.</p>
            ) : (
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="border-b border-border pb-4 last:border-0">
                    <h3 className="font-semibold">{contact.fullName}</h3>
                    <p className="text-sm text-muted-foreground">{contact.email}</p>
                    <p className="text-sm text-muted-foreground">{contact.phoneNumber}</p>
                    {contact.notes && <p className="mt-2 text-sm">{contact.notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
