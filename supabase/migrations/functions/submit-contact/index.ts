import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { name, email, subject, message } = await req.json()

        // Google Sheets API configuration
        const GOOGLE_SHEETS_API_KEY = Deno.env.get('GOOGLE_SHEETS_API_KEY')
        const SPREADSHEET_ID = Deno.env.get('GOOGLE_SPREADSHEET_ID')
        const RANGE = 'Sheet1!A:E' // Adjust range as needed

        if (!GOOGLE_SHEETS_API_KEY || !SPREADSHEET_ID) {
            throw new Error('Missing Google Sheets configuration')
        }

        // Prepare data for Google Sheets
        const timestamp = new Date().toISOString()
        const values = [[timestamp, name, email, subject, message]]

        // Google Sheets API URL
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}:append?valueInputOption=RAW&key=${GOOGLE_SHEETS_API_KEY}`

        // Send data to Google Sheets
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                values: values
            })
        })

        if (!response.ok) {
            const errorData = await response.text()
            console.error('Google Sheets API Error:', errorData)
            throw new Error(`Google Sheets API error: ${response.status}`)
        }

        const result = await response.json()
        console.log('Successfully added to Google Sheets:', result)

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Contact form submitted successfully!'
            }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            },
        )

    } catch (error) {
        console.error('Error:', error)
        return new Response(
            JSON.stringify({
                success: false,
                error: error.message || 'An error occurred while submitting the form'
            }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 500,
            },
        )
    }
})