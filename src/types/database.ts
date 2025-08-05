export interface Database {
    public: {
        Tables: {
            contacts: {
                Row: {
                    id: string
                    name: string
                    email: string
                    subject: string
                    message: string
                    status: 'new' | 'read' | 'replied'
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    email: string
                    subject: string
                    message: string
                    status?: 'new' | 'read' | 'replied'
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    email?: string
                    subject?: string
                    message?: string
                    status?: 'new' | 'read' | 'replied'
                    created_at?: string
                }
            }
        }
    }
}