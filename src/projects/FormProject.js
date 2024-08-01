//Full-Featured Form with Validation and API Integration
//Combining validation, dynamic fields, and API submission in a real-world example.

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Entry {
  id: number;
  name: string;
  email: string;
}

const FullFeaturedForm: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([{ id: 1, name: '', email: '' }]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (id: number, field: keyof Entry, value: string) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
    validateField(id, field, value);
  };

  const handleAddEntry = () => {
    setEntries((prevEntries) => [
      ...prevEntries,
      { id: prevEntries.length + 1, name: '', email: '' },
    ]);
  };

  const validateField = (id: number, field: keyof Entry, value: string) => {
    if (field === 'name' && !value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`${id}-name`]: 'Name is required',
      }));
    } else if (field === 'email' && !value.includes('@')) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`${id}-email`]: 'Invalid email',
      }));
    } else {
      setErrors((prevErrors) => {
        const { [`${id}-${field}`]: _, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Validate all fields before submission
    let valid = true;
    entries.forEach((entry) => {
      if (!entry.name) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [`${entry.id}-name`]: 'Name is required',
        }));
        valid = false;
      }
      if (!entry.email.includes('@')) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [`${entry.id}-email`]: 'Invalid email',
        }));
        valid = false;
      }
    });

    if (!valid) {
      return;
    }

    // Send data to API
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entries),
      });
      const result = await response.json();
      console.log('Submission result:', result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {entries.map((entry) => (
        <div key={entry.id}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={entry.name}
              onChange={(e) => handleInputChange(entry.id, 'name', e.target.value)}
            />
            {errors[`${entry.id}-name`] && <span>{errors[`${entry.id}-name`]}</span>}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={entry.email}
              onChange={(e) => handleInputChange(entry.id, 'email', e.target.value)}
            />
            {errors[`${entry.id}-email`] && <span>{errors[`${entry.id}-email`]}</span>}
          </div>
        </div>
      ))}
      <button type="button" onClick={handleAddEntry}>
        Add Entry
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FullFeaturedForm;


/*
Explanation
entries: Manages the state for multiple form entries.
errors: Manages the validation error messages for each field.
handleInputChange: Updates the specific field of an entry and validates it.
handleAddEntry: Adds a new entry to the form.
validateField: Validates individual fields and updates error state.
handleSubmit: Validates all entries and submits the form data to an API.
*/

