import React, { useRef, Dispatch, SetStateAction, useLayoutEffect } from 'react';
import Event from './Event'
import './EventTimeline.scss';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Button } from '@material-ui/core';
import { IEvent, IAppState } from '../App';
import { v4 as uuidv4 } from 'uuid';

function EventTimeline(props: { appState: IAppState, setAppState: Dispatch<SetStateAction<IAppState>> }) {

  const eventTimeLineRef = useRef<HTMLDivElement>(null);
  eventTimeLineRef.current?.scrollTo(9999999, 0);

  useLayoutEffect(()=>{
    console.log("TIMELINE RENDERED");
    console.log(eventTimeLineRef.current);
    console.log(eventTimeLineRef.current?.childElementCount);
    console.log(props.appState.currentEvent);
    eventTimeLineRef.current?.scrollTo(9999999, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.appState.currentEvent])

  const onEventClick = (id) => {
    const newState =  { ...props.appState, currentEvent: id };
    props.setAppState(newState);
  };

  const addEvent =() => {
    const newEvent: Partial<IEvent> = {
      guid: uuidv4(),
      currentQuestion: 0
    };
    const newState =  { ...props.appState };
    if (!newState.days[props.appState.currentDate!]) {
      newState.days = { ...newState.days, [props.appState.currentDate!]: { events: [], done: false } };
    }
    newState.days[props.appState.currentDate!].events.push(newEvent as any);
    newState.currentEvent = newEvent.guid!;
    props.setAppState(newState);
  };

  return (
    <div className="EventTimeline" ref={eventTimeLineRef}>
        {props.appState.days && props.appState.days[props.appState.currentDate!] && props.appState.days[props.appState.currentDate!].events.map((event, index)=>
            <Event key={index} isCurrent={event.guid === props.appState.currentEvent} event={event} onClick={() => onEventClick(event.guid)} />)}
            <Button onClick={addEvent}>
              <AddCircleOutlineIcon style={{ width: '57px', height: '40px'}} />
            </Button>
    </div>
  );
}

export default EventTimeline;
