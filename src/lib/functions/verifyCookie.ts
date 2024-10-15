function verifyToken() {
    // Log all cookies for debugging
    console.log('All cookies:', document.cookie);
  
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth_token='))
      ?.split('=')[1];
  
    if (!token) {
      console.log('No auth token found');
      return false;
    }
  
    // Basic check: ensure token is not empty and has a valid format
    // You might want to add more sophisticated checks here
    const isValid = token.trim().length > 0 && token.includes('.');
  
    if (!isValid) {
      console.log('Invalid token format');
      return false;
    }
  
    // If we reach here, the token is present and has a valid format
    console.log('Valid token found');
    return true;
  }