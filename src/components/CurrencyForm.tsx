import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

const router = useRouter()

const CurrencyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      
      const response = await fetch('/api/currency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/dashboard')
      } else {
        const errorData = await response.json();
        console.log(errorData.message);
        console.error('Error al crear la moneda.');
      }
    } catch (error) {
      console.error('Error al crear la moneda:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block font-bold">Currency Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Currency</button>
    </form>
  );
};

export default CurrencyForm;
