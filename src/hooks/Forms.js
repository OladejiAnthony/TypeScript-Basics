//Forms in React TypeScript

//Beginner Level
//Controlled Components - In controlled components, form data is handled by the React component state.
import React, { useState, ChangeEvent, FormEvent } from 'react';

const ControlledForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    alert(`Name: ${name}, Email: ${email}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ControlledForm;

/*
Explanation
useState: Manages the state for name and email.
handleNameChange: Updates the name state on input change.
handleEmailChange: Updates the email state on input change.
handleSubmit: Prevents default form submission and alerts the form data.
 */

//Uncontrolled Components - In uncontrolled components, form data is handled by the DOM.
import React, { useRef, FormEvent } from 'react';

const UncontrolledForm: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    alert(`Name: ${name}, Email: ${email}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" ref={nameRef} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" ref={emailRef} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
/*
Explanation
useRef: Creates references to the name and email input fields.
handleSubmit: Prevents default form submission and alerts the form data using the input field values.
*/


//Intermediate Level
//Form Validation - Adding validation to controlled components.
import React, { useState, ChangeEvent, FormEvent } from 'react';

const ValidatedForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (!event.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Name is required' }));
    } else {
      setErrors((prevErrors) => {
        const { name, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (!event.target.value.includes('@')) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email' }));
    } else {
      setErrors((prevErrors) => {
        const { email, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name) {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Name is required' }));
    }
    if (!email.includes('@')) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email' }));
    }
    if (name && email.includes('@')) {
      alert(`Name: ${name}, Email: ${email}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={handleNameChange} />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ValidatedForm;
/*
Explanation
errors: Manages error messages for name and email.
handleNameChange: Validates the name input and updates error state.
handleEmailChange: Validates the email input and updates error state.
handleSubmit: Checks for errors before alerting the form data.
*/

//Advanced Level
//Complex Form with Dynamic Fields - Creating a dynamic form where users can add multiple entries.

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Entry {
  id: number;
  name: string;
  email: string;
}

const DynamicForm: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([{ id: 1, name: '', email: '' }]);

  const handleInputChange = (id: number, field: keyof Entry, value: string) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const handleAddEntry = () => {
    setEntries((prevEntries) => [
      ...prevEntries,
      { id: prevEntries.length + 1, name: '', email: '' },
    ]);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(entries);
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
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={entry.email}
              onChange={(e) => handleInputChange(entry.id, 'email', e.target.value)}
            />
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

export default DynamicForm;

/*
Explanation
entries: Manages the state for multiple form entries.
handleInputChange: Updates the specific field of an entry.
handleAddEntry: Adds a new entry to the form.
handleSubmit: Logs the form entries on submit.
*/




