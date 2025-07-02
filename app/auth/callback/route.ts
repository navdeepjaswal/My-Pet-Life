import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    
    // Exchange the code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (data.user && !error) {
      // Check if user profile exists
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('user_id', data.user.id)
        .single();
      
      // Create profile if it doesn't exist
      if (!existingProfile) {
        const displayName = data.user.user_metadata?.name || 
                           data.user.user_metadata?.full_name || 
                           data.user.email?.split('@')[0] || 
                           'User';
        
        await supabase
          .from('user_profiles')
          .insert([
            {
              user_id: data.user.id,
              name: displayName,
            }
          ]);
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
} 