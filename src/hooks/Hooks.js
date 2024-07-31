//By mastering these concepts, you can handle a wide variety of state management scenarios in your TypeScript-React applications.
//Typing Primitive State: Use useState<number>(0) for numbers, useState<string>('') for strings, etc.
//Typing Object State: Define an interface for the object and use useState<User>({ ... }).
//Typing Array State: Define the array type using useState<string[]>([]) or useState<Array[]>([]) for arrays of strings.
//Complex State Management: Use Partial and spread operator for complex state updates.
//Function Initial State: Use a function to compute the initial state when it's expensive to compute.

//Beginner Level: Basic useState with Primitive Types
import React, { useState } from 'react';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0); // Typing the state as number

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

export default Counter;

//Intermediate Level: useState with Object Types
import React, { useState } from 'react';

interface User {
  name: string;
  age: number;
}

const UserProfile: React.FC = () => {
  //managing state with an Object
  const [user, setUser] = useState<User>({ name: 'John Doe', age: 30 });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, name: e.target.value });
  };
  console.log({user});

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <input type="text" value={user.name} onChange={handleNameChange} />
    </div>
  );
};

export default UserProfile;

//Intermediate Level: useState with Array Types
import React, { useState } from 'react';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Array<string>>([]); // Typing the state as an array of strings
  const [newTodo, setNewTodo] = useState<string>('');

  const addTodo = () => {
    setTodos([...todos, newTodo]);
    setNewTodo('');
  };

  return (
    <div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
};

export default TodoList;

//Advanced Level: useState with Complex Types and Functions(Managing State with a Complex Object:)
import React, { useState } from 'react';

interface Address {
  street: string;
  city: string;
  zipCode: string;
}

interface User {
  name: string;
  age: number;
  address: Address;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: 'John Doe',
    age: 30,
    address: {
      street: '123 Main St',
      city: 'Anytown',
      zipCode: '12345',
    },
  });

  const updateAddress = (newAddress: Partial<Address>) => {
    setUser({
      ...user,
      address: {
        ...user.address,
        ...newAddress,
      },
    });
  };

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Address: {user.address.street}, {user.address.city}, {user.address.zipCode}</p>
      <input
        type="text"
        placeholder="Street"
        value={user.address.street}
        onChange={(e) => updateAddress({ street: e.target.value })}
      />
      <input
        type="text"
        placeholder="City"
        value={user.address.city}
        onChange={(e) => updateAddress({ city: e.target.value })}
      />
      <input
        type="text"
        placeholder="Zip Code"
        value={user.address.zipCode}
        onChange={(e) => updateAddress({ zipCode: e.target.value })}
      />
    </div>
  );
};

export default UserProfile;

//Advanced Level: useState with Complex Types and Functions(useState with Function to Compute Initial State:)
import React, { useState } from 'react';

const ExpensiveComponent: React.FC = () => {
  const calculateInitialState = (): number => {
    console.log('Calculating initial state...');
    // Imagine this is an expensive computation
    return 42;
  };

  const [count, setCount] = useState<number>(() => calculateInitialState());

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default ExpensiveComponent;




