import React, { useEffect, useState } from 'react';
interface Entry {
   string: string
}
function renderEntry(entry: Entry) {
   return <p>{entry.string}</p>
}
function Text() {
   const [entries, setEntries] = useState([] as Entry[]);
   useEffect(() => {
      fetch('netlify/functions/getEntry')
      .then(response => response.json() as Promise<Entry[]>)
      .then(data => setEntries(data));
   }, [] );
   return <p>{entries.map(e => renderEntry(e))}</p>
}

export default Text;