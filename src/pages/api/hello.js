export default async function handler(req, res) {
  try {
    const response = await fetch("http://localhost:1337/api/kreditmotorbekas");
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: $ {response.statusText}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
}