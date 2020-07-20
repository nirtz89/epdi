import React, { useState } from 'react';
import Container from './components/Container';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

export interface IDay {
  events: IEvent[]
  done: boolean;
}

export interface IPeople {
  name?: string,
  phone?: string,
  id?: string
}

export enum IEventType {
    Gym = "gym",
    Home = "home",
    Pool = "pool",
    Sea = "sea",
    Prayer = "prayer",
    Clinic = "clinic",
    Restaurant = "restaurant",
    Pub = "pub"
}

export interface IEvent {
  guid: string;
  type: IEventType;
  location: {lat: number, lon: number};
  people: IPeople[],
  startTime: string;
  endTime: string;
  numberOfPeople: number,
  transportation: ITransportationType;
  maskOn: boolean;
}

export interface IQuestion {
  guid: string;
  type: IQuestionType,
  question: string,
  condition?: string,
  followUp?: IQuestion[]
}

export enum IQuestionType {
  Bool,
  Hours,
  Location,
  Number,
  People,
  Transportation
}

export enum ITransportationType {
  Taxi = "taxi",
  Bus = "bus",
  Walk = "walking",
  Bicycle = "bicycle"
}

export interface IAppState {
  days: Record<string, IDay>; // key date string
  questions: IQuestion[];
  currentDate?: string;
  currentEvent?: string;
}

const App = (props) => {
    const eventMock: IEvent = {
      guid: uuidv4(),
      type: IEventType.Home,
      maskOn: true,
      numberOfPeople: 2,
      people: [],
      location: { lat: 1, lon: 1},
      transportation: ITransportationType.Walk,
      startTime: '8:00',
      endTime: '10:00'
  }
  const initState: IAppState = {
    currentDate: new Date().toLocaleDateString(),
    currentEvent: eventMock.guid,
    days: {
        [new Date().toLocaleDateString()]: {events: [eventMock], done: true }
    },
    questions: [
    {
      guid: uuidv4(),
      type: IQuestionType.Location,
      question: 'Where have you been?'
    },
    {
    guid: uuidv4(),
    type: IQuestionType.Hours,
    question: 'At what hours?'
    },
    {
      guid: uuidv4(),
      type: IQuestionType.Bool,
      question: 'Did you wear a mask?'
    },
    {
      guid: uuidv4(),
      type: IQuestionType.Number,
      question: 'How many people were there with you?',
      condition: '> 0',
      followUp: [
        {
          guid: uuidv4(),
          type: IQuestionType.People,
          question: 'Please fill in the people that you know were there',
        }
      ]
    },
    {
      guid: uuidv4(),
      type: IQuestionType.Transportation,
      question: 'How did you get there?'
    }
  ]
}

  const [state, setState] = useState(initState);
  const [location, setLocation] = useState(null);
  return (
    <div className="App">
      <Container appState={state} setAppState={setState} location={location} setLocation={setLocation} testDate={props.history.location.state} />
    </div>
  );
}

export default App;
