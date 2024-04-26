import { Form, useNavigate, useNavigation, useActionData, json, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting'; // 제출 중인 정보 얻을 수 있다.

  function cancelHandler() { // Form은 submit하면 서버로 바로 전송이 되는 것이 아니라 action으로 간다.
    navigate('..');
  }

  return (
    <Form method={method} action="" className={classes.form}> 
      {data && data.errors && <ul>
        {Object.values(data.errors).map(err => <li key={err}>{err}</li>)}
        </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" 
        type="text" 
        name="title" 
        required 
        defaultValue={event ? event.title : ''}/>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" 
        type="url" 
        name="image" 
        required
        defaultValue={event ? event.image : ''}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" 
        type="date" 
        name="date" 
        required 
        defaultValue={event ? event.date : ''}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" 
        name="description" 
        rows="5" 
        required
        defaultValue={event ? event.description : ''}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? '제출 중' : 'Save'}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({request, params}) {
  const method = request.method;
  const data = await request.formData();

  const eventData = {
      title: data.get('title'),
      image: data.get('image'),
      date: data.get('date'),
      description: data.get('description'),
      
  };

  let url = 'http://localhost:8080/events';

  if (method === 'PATCH') {
    const eventId = params.eventId;
    url = 'http://localhost:8080/events/' + eventId;
  }

  const response = await fetch(url, { 
      method: method,
      headers: {
          'Content-Type' : 'application/json'
      },
      body: JSON.stringify(eventData)
  });

  if (response.status === 422) {
      return response;
  }

  if (!response.ok) {
      throw json({message : 'Could not save event.'}, {status: 500});
  }

  return redirect('/events')
}
