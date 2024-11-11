//Beginner Level
//Basic Usage - useEffect is a React hook that allows you to perform side effects in functional components. It's similar to lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount in class components.

import React, { useEffect, useState } from 'react';

const SimpleComponent: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    console.log('Component mounted or count changed:', count);

    return () => {
      console.log('Cleanup on unmount or before count changes');
    };
  }, [count]); // Dependency array

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default SimpleComponent;


//Intermediate Level
//Fetching Data - Use useEffect for fetching data when the component mounts.

import React, { useEffect, useState } from 'react';
//define an interface
interface Data {
  id: number;
  title: string;
}

const FetchDataComponent: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const result: Data[] = await response.json(); //TypeScript object interface
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Fetched Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FetchDataComponent;




//Advance Level
//Optimizing Performance with useEffect - Sometimes effects depend on multiple states or props, and you need to optimize when the effect runs.

import React, { useEffect, useState } from 'react';

const OptimizedComponent: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    console.log('Effect runs when count changes');

    return () => {
      console.log('Cleanup before count changes');
    };
  }, [count]); // Effect runs only when count changes

  useEffect(() => {
    console.log('Effect runs when text changes');

    return () => {
      console.log('Cleanup before text changes');
    };
  }, [text]); // Effect runs only when text changes

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
    </div>
  );
};

export default OptimizedComponent;


