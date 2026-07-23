import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import emailjs, { init } from 'emailjs-com';

init('user_R88Ea4OX4lVMMHHT8HiBj');

const INITIAL_STATE = {
  user_email: '',
  user_name: '',
  message: '',
  nameError: '',
  emailError: '',
  messageError: '',
  successMessage: '',
  validate: false,
  count: 0,
};

export default function Contact() {
  const [state, setState] = useState(INITIAL_STATE);

  const validate = () => {
    const emailValidate =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const messageValidate = /(.+){10,500}/;
    const nameValidate =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    const { user_email, message, user_name } = state;

    if (!nameValidate.test(user_name)) {
      setState({ ...state, nameError: 'Invalid name' });
      return false;
    }

    if (!emailValidate.test(user_email)) {
      setState({ ...state, emailError: 'Invalid email', nameError: '' });
      return false;
    }

    if (!messageValidate.test(message)) {
      setState({
        ...state,
        messageError: 'Message must have at least 10 characters',
        emailError: '',
        nameError: '',
      });
      return false;
    }

    setState({
      ...state,
      valid: true,
      messageError: '',
      emailError: '',
    });
    return true;
  };

  useEffect(() => {
    setState({ ...state, count: state.message.length });
  }, [state.message]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const test = {
      from_name: state.user_name,
      reply_to: state.user_email,
      to_name: 'Erick Silva',
      message: state.message,
    };
    console.log(e.target);
    emailjs
      .send(
        'service_omk2bik',
        'template_5nig7zb',
        test,
        'user_R88Ea4OX4lVMMHHT8HiBj'
      )
      .then((r) => console.log(r.text))
      .catch((e) => console.log(e.text));
  };

  return (
    <div className="contact-page" id="contact">
      <h1>Contact</h1>
      <div className="contact-container">
        <div className="contact-social">
          <ul>
            <li>
              <a
                target="_blank"
                className="fab fa-linkedin"
                href="https://www.linkedin.com/in/ericksvdev/"
                rel="noreferrer"
              />
            </li>
            <li>
              <a
                target="_blank"
                className="fab fa-github"
                href="https://github.com/ericksvdev"
                rel="noreferrer"
              />
            </li>
            <li>
              <a
                target="_blank"
                className="fas fa-envelope"
                href="mailto:erick.silva6653@gmail.com"
                rel="noreferrer"
              />
            </li>
            <li>
              <a
                target="_blank"
                className="fab fa-instagram"
                href="https://www.instagram.com/ericksvdev/"
                rel="noreferrer"
              />
            </li>
          </ul>
        </div>
        {state.successMessage && (
          <div className="success-message">
            <p>{state.successMessage}</p>
            <Button
              type="button"
              onClick={() => {
                setState(INITIAL_STATE);
              }}
            >
              Send another message
            </Button>
          </div>
        )}
        {!state.successMessage && (
          <div className="contact-form">
            <h2>Get in touch</h2>
            <form
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (validate()) {
                  sendEmail(e);
                  console.log('test');
                  setState({
                    ...INITIAL_STATE,
                    successMessage: "Message sent, I'll answer you soon!",
                  });
                }
              }}
            >
              <div className="name-container">
                <input
                  onChange={handleChange}
                  className={state.nameError ? 'invalid' : ''}
                  value={state.user_name}
                  name="user_name"
                  type="text"
                  placeholder="Name"
                />
                {state.nameError && (
                  <p className="error-message">{state.nameError}</p>
                )}
              </div>
              <div className="email-container">
                <input
                  onChange={handleChange}
                  className={state.emailError ? 'invalid' : ''}
                  value={state.email}
                  name="user_email"
                  type="text"
                  placeholder="email@example.com"
                />
                {state.emailError && (
                  <p className="error-message">{state.emailError}</p>
                )}
              </div>
              <div className="textarea-container">
                <textarea
                  value={state.message}
                  onChange={handleChange}
                  className={state.messageError ? 'invalid' : ''}
                  name="message"
                  placeholder="Your message here"
                  maxLength="500"
                />
                <span className="message-counter">
                  {state.count}
                  /500
                </span>
                {state.messageError && (
                  <p className="error-message">{state.messageError}</p>
                )}
              </div>
              <Button type="submit" value="Send">
                Submit
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
