import React from "react";

function Basic() {
  /*Type - Any & Unknown  */
  let school: any;
  let personName: unknown; //recommended

  /*Types in TypeScript  */

  /* Type - String */
  //syntax - let varName: string
  let name = "anthony"; //JavaScript
  let job: string = "developer"; //TypeScript
  console.log(job);

  /* Type - Number */
  let octa = 8; //JavaScript
  let age: number = 3; //TypeScript
  let digit: number = 2;

  //Example -
  let shop: string;
  shop = "chupet";
  shop = 5; // error

  /* Type - Boolean */
  let isChecked: boolean = false;

  /*Unions in TypeScript*/
  let student: number | string;
  student = 2;
  student = "Shola";

  /*Functions in TypeScript*/
  //Function Declarations - You can declare a function in TypeScript using either the function keyword or declared as a function expression:
  //A. Function Keyword - This declares a function named greet that takes a single parameter name of type string and returns void (i.e., no value).
  function greet(name: string): void {
    console.log(`Hello, ${name}!`);
  }
  greet("Anthony");
  console.log({ greet });

  //B. Function Expressions - You can also declare a function as an expression. This declares a function named greet as a constant variable.
  const greeting = (name: string): void => {
    console.log(`Hello, ${name}!`);
  };

  //Function Types - You can specify the type of a function using the "=>" syntax. This declares a type alias GreetFunction for a function that takes a string parameter and returns void.
  type GreetFunction = (name: string) => void; //it can have void, never, string, number etc etc
  //OR
  let Greet: Function;

  //Note - type "void" returns undefined, while type "never" doesnt return anything, so it is recommmended to use the "never" type instead of the "void" type.

  //Function Parameters - You can specify the types of function parameters using the ":" syntax. This declares a function greet with two parameters: name of type string and age of type number.
  function greetParameter(name: string, age: number): void {
    console.log(`Hello, ${name}! You are ${age} years old.`);
  }

  //Function Return Types - You can specify the return type of a function using the ":" syntax after the parenthesis: This declares a function add that returns a number value. We can have it return string, boolean etc
  function add(x: number, y: number): number {
    return x + y;
  }

  //Function Overloads - You can declare multiple function overloads with different parameter types. This declares two overloads for the greet function: one with a single string parameter and another with two parameters, string and number.
  function greetOver(name: string): void;
  function greetOver(name: string, age: number): void {
    console.log(`Hello, ${name}! You are ${age} years old.`);
  }

  /* Type - Array */
  //Declaring Array - You can declare an array in TypeScript using the Array<T> type, where T is the type of the elements. Below are the two syntax structures for defining an array in TypeScript:
  let numbers1: Array<number> = [1, 2, 3];   //Or, using   
  let numbers2: number[] = [1, 2, 3];

  //Types of Array - TypeScript supports just two types of arrays:
  //1. Homogeneous Arrays: All elements have the same type
  let bool: Array<boolean> = [true, false]; //Using Array<T> syntax:
  let numb: Array<number> = [1,2,3,4];
  let num: number[] = [1, 2, 3]; //Using array type literal syntax:
  let str: string[] = ["a", "b", "c"];
  //2. Heterogeneous Arrays: Elements can have different types by using Union Types(|) sysmbol inbetween.
  let mixes: Array<number | string> = [1, "two", 3, "four"];
  let mixed: (number | string)[] = [1, "a", 2, "b"];

  console.log({ mixed });

  //Array Methods - TypeScript supports the same array methods as JavaScript, such as:- push(), pop(), shift(), unshift(), splice(), slice(), indexOf(), includes(), forEach(), map(), filter(), reduce() etc
  //Type Inference - TypeScript can often infer the type of an array automatically:
  let numbers = [1, 2, 3]; // inferred type: number[]
  //Read-only Arrays - You can declare a read-only array using the "readonly" keyword WHICH prevents the array from being modified:
  let readonlyNumbers: readonly number[] = [1, 2, 3];
  let readonlyNumberss: ReadonlyArray<number> = [1, 2, 3]; //we are using the `ReadonlyArray` type.

  //Tuple Type -In TypeScript, a "tuple" is a type that represents "an array with a fixed number of elements", where each element can be of a different type. A Tuple type is defined using square brackets [] and comma(,) to separate the types. For example:
  //The example below defines a tuple type MyTuple with three elements: a.The first element is a string, b. The second element is a number, c.The third element is a boolean.
  let MyTuple: [string, number, boolean] = ["a", 1, true];
  //OR
  type MyTuples = [string, number, boolean];
  const myTuples: MyTuples = ["hello", 42, true];
  const errorTuples: MyTuples = ["hello", "hi", true];

  //Note - Tuples are useful when you need to work with a fixed-size array of elements with different types. They provide type safety and ensure that the correct types are used for each element. Arrays can have "any number of elements", whereas Tuples have "a fixed number of elements".
  //Array Spread - TypeScript supports the array spread operator (...):
  let myNumbers = [1, 2, 3];
  let moreNumbers = [...myNumbers, 4, 5]; // [1, 2, 3, 4, 5]

  /* Type - Objects */
  let role: Object;
  //This means that role can be assigned any value that is an object, such as:
      /*- An object literal: role = { name: 'John', age: 30 };
        - An array: role = [1, 2, 3];
        - A function: role = function() { console.log('hello'); };
        - A new object: role = new Date();
      */

  //Declaring Objects - We have 3 different ways of declaring an Object in TypeScript. You can declare an object in TypeScript using the {} syntax:
  //1. using Object Literal:
  let person: { name: string; age: number } = { name: "John", age: 30 };
  //2. using the interface keyword(recommended):
  interface Person {
    name: string;
    age: number;
  }
  let persons: Person = { name: "John", age: 30 };
  let errorPerson: Person = { name: "John", age: "Thirty" }; // error
  console.log({ persons });

  //3. using the type keyword:
  type Details = {
    name: string;
    age: number;
  };
  let details: Details = { name: "John", age: 30 }; // valid
  let errorDetails: Details = { name: "John", age: "Thirty" }; // error: Type 'string' is not assignable to type 'number'.

  //Types of Objects -TypeScript supports two types of objects:
  //1. Plain Objects: Simple objects with key-value pairs.
  let user: { name: string; age: number } = { name: "John", age: 30 };
  //2. Nested Objects: Objects with nested properties.
  let nestedUser: { name: string; address: { street: string; city: string } } =
    {
      name: "John",
      address: { street: "123 Main St", city: "New York" },
    };
  //Another example - an array of shoes objects
  //a. Declares an interface Shoe with two properties: id and name.
  interface Shoe {
    id: number;
    name: string;
  }
  //b. Declares a variable lotsOfShoes of type Shoe[], which is an array of Shoe objects.
  let lotsOfShoes: Shoe[];
  //c. Declares a variable shoes of type Shoe and assigns it an object literal that matches the Shoe interface.
  let shoes: Shoe = { id: 1, name: "Adidas" };
  //d. Initializes the lotsOfShoes array with Shoe objects.
  lotsOfShoes = [shoes, { id: 2, name: "Nike" }, { id: 3, name: "Converse" }];
  //e. Logs the lotsOfShoes array to the console.
  console.log({ lotsOfShoes });

  //Object Properties - You can access object properties using dot notation or bracket notation:
  interface DotBracket {
    name: string;
    age: number;
  }

  const dot: DotBracket = {
    name: "John",
    age: 2,
  };

  console.log(dot.name); // 'John'
  console.log(dot["name"]); // 'John'

  //Optional Properties - You can declare optional properties using the ? symbol:
  interface Optional {
    name: string;
    age?: number;
  }
  let options: Optional = { name: "John", age: 2 }; // valid

  //Read-only Properties - You can declare read-only properties using the readonly keyword:
  interface ReadOnly {
    readonly name: string;
    age: number;
  }
  let read: ReadOnly = { name: "John", age: 30 };
  read.name = "Jane"; // error

  //Object Spread - TypeScript supports the object spread operator (...):
  let spread = { name: "John", age: 30 };
  let newSpread = { ...spread, city: "New York" }; // { name: 'John', age: 30, city: 'New York' }
  console.log({ newSpread });
  //AND
  interface Pers {
    name: string;
    age: number;
    city?: string; // added city as an optional property
  }

  const pers: Pers = {
    name: "John",
    age: 30,
  };

  const updatedPerson = { ...pers, city: "New York" };

  console.log({ updatedPerson }); // { name: 'John', age: 30, city: 'New York' }

  //Object Destructuring - TypeScript supports object destructuring:

  let descructure = { john: "John", life: 30 };
  let { john, life } = descructure; // name = 'John', age = 30
  console.log({ john });
  console.log({ life });

  /* Type Extensions for Interface & Type Aliases */
  //Interface Extension - You can extend an interface using the "extends" keyword. In this example, the Dog interface extends the Animal interface, inheriting its properties and adding a new property breed.
  interface Animal {
    name: string;
  }
  interface Cat extends Animal {
    breed: string;
  }

  let musu: Cat = {
    name: "jack",
    breed: "ox"
  }
  console.log({musu})

  //Procedure - a.You define an Animal interface with a name property of type string. b.You define a Cat interface that extends Animal, adding a breed property of type string. c.You declare a variable musu of type Cat and assign it an object literal with name and breed properties. d.You log the musu object to the console.
  

  //Type Alias Extension -You can extend a type alias using the "&" operator. In this example, the Dog type alias extends the Animal type alias, combining their properties.
  type AnimalFamily = {
    name: string;
  };

  type Tiger = AnimalFamily & {
    breed: string;
  };

  //Extending Multiple Interfaces/Type Aliases - You can extend multiple interfaces or type aliases using the extends keyword or & operator:
  interface Kingdom {
    name: string;
  }
  interface Mammal {
    fur: boolean;
  }
  interface Dog extends Kingdom, Mammal {
    breed: string;
  }

  // OR
  type Kingdom = {
    name: string;
  };
  type Mammal = {
    fur: boolean;
  };
  type Dog = Kingdom &
    Mammal & {
      breed: string;
    };

  //Using Extended Interfaces/Type Aliases - You can use the extended interfaces or type aliases as you would with any other interface or type alias:

  const dog: Dog = {
    name: "Fido",
    breed: "Golden Retriever",
    fur: true,
  };
  console.log({dog})

  //Interface extending a type - In this example, the Cat interface extends the Animal type.
  type Animal = {
    name: string;
  }interface Cat extends Animal {
    breed: string;
  }

  //Type extending an interface - In this example, the Cat type extends the Animal interface using the intersection operator &.
  interface Animal {
    name: string;
  }

  type Cat = Animal & {
    breed: string;
  }











  return <div>Basics</div>;
}

export default Basic;
