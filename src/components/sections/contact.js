import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  width: 100%;
  gap: 20px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 1rem;
  background-color: var(--light-navy);
  border: 1px solid var(--lightest-navy);
  border-radius: var(--border-radius);
  color: var(--lightest-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  outline: none;
  transition: var(--transition);

  &:focus {
    border-color: var(--accent);
  }

  &::placeholder {
    color: var(--slate);
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background-color: var(--light-navy);
  border: 1px solid var(--lightest-navy);
  border-radius: var(--border-radius);
  color: var(--lightest-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  outline: none;
  transition: var(--transition);
  min-height: 150px;
  resize: vertical;

  &:focus {
    border-color: var(--accent);
  }

  &::placeholder {
    color: var(--slate);
  }
`;

const StyledButton = styled.button`
  ${({ theme }) => theme.mixins.bigButton};
  cursor: pointer;
  margin-top: 10px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledStatus = styled.p`
  color: ${props => (props.success ? 'var(--accent)' : '#ff6b6b')};
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  margin-top: 20px;
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/{your-form-id}', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({
          success: true,
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ success: false, message: 'Something went wrong. Please try again.' });
      }
    } catch {
      setStatus({ success: false, message: 'Network error. Please try again.' });
    }

    setLoading(false);
  };

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What&apos;s Next?</h2>

      <h2 className="title">Get In Touch</h2>

      <p>
        I&apos;m currently open to new opportunities and always interested in collaborations.
        Whether you have a project idea, a job opening, or just want to connect — feel free to
        reach out!
      </p>

      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <StyledInput
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <StyledTextarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <StyledButton type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Say Hello'}
        </StyledButton>
        {status && <StyledStatus success={status.success}>{status.message}</StyledStatus>}
      </StyledForm>
    </StyledContactSection>
  );
};

export default Contact;
