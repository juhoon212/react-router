import { useEffect } from 'react';
import classes from './NewsletterSignup.module.css';
import {useFetcher, Form} from 'react-router-dom';

function NewsletterSignup() {
    const fetcher = useFetcher(); // 다른 라우트로 이동 x
    const { data, state } = fetcher;

    useEffect(() => {
        if (state === 'idle' && data && data.message) {
            window.alert(data.message);
        }
    }, [data, state]);

  return (
    <fetcher.Form method="post" action= "/newsletter" className={classes.newsletter}>
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup; 