

export const convertDatetoString = (date :  string)=>{
    const formatted = new Date(date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit'
      })
    return formatted ; 
    }