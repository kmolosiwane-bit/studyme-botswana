import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabaseUrl = 'https://jzrficgbbhchcsainyfxi.supabase.co' 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6cmZpY2diYmhjaGNzYWlueWZ4aSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzE2NzQ3NTY2LCJleHAiOjIwMzIzMjM1NjZ9.3nR7o7Xq8ZQ8ZQ8ZQ8ZQ8ZQ8ZQ8ZQ8ZQ8ZQ8ZQ8ZQ8' // paste your full anon key here

const supabase = createClient(supabaseUrl, supabaseKey)

async function loadPapers() {
  console.log('Loading BGCSE papers...')
  
  const { data, error } = await supabase
    .from('papers')
    .select('*')
    .order('year', { ascending: false })

  if (error) {
    console.error('Error fetching papers:', error)
    document.getElementById('papers-list').innerHTML = 'Error loading papers. Check RLS policies.'
    return
  }

  console.log('Papers:', data)
  
  if (!data || data.length === 0) {
    document.getElementById('papers-list').innerHTML = 'No papers uploaded yet.'
    return
  }

  document.getElementById('papers-list').innerHTML = data.map(p => `
    <div style="padding:12px; margin:8px 0; border:1px solid #ddd; border-radius:8px;">
      <a href="${p.file_url}" target="_blank" style="text-decoration:none; font-weight:bold; color:#1a73e8;">
        ${p.exam_type} ${p.subject} ${p.year} Paper ${p.paper_number || ''}
      </a>
    </div>
  `).join('')
}

// THIS LINE WAS MISSING - This actually runs the function
loadPapers()