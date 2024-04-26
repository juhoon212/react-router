import classes from './EventItem.module.css';
import {Link, useSubmit} from 'react-router-dom';

function EventItem({ event }) {

  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, {method: 'delete'});  // 두 번째 인자의 option들은 action 함수에서 request.option 명으로 받을 수 있다. 
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
