export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string | null;
          message: string;
          status: 'new' | 'read' | 'replied';
          created_at: string;
          project_type: string | null;
          budget_range: string | null;
          timeline: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject?: string | null;
          message: string;
          status?: 'new' | 'read' | 'replied';
          created_at?: string;
          project_type?: string | null;
          budget_range?: string | null;
          timeline?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string | null;
          message?: string;
          status?: 'new' | 'read' | 'replied';
          created_at?: string;
          project_type?: string | null;
          budget_range?: string | null;
          timeline?: string | null;
        };
      };
    };
  };
}
