import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledSkillsSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 30px;
    margin-top: 50px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      grid-gap: 20px;
    }
  }
`;

const StyledSkillCategory = styled.div`
  background-color: var(--light-navy);
  border-radius: var(--border-radius);
  padding: 30px 20px;
  transition: var(--transition);

  &:hover,
  &:focus-visible {
    transform: translateY(-5px);
    background-color: var(--lightest-navy);
  }

  h3 {
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--lightest-navy);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      position: relative;
      padding-left: 20px;
      margin-bottom: 10px;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--accent);
      }

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
`;

const Skills = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['React.js', 'JavaScript (ES6+)', 'UI Development'],
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'Express.js', 'REST APIs', 'Authentication', 'Cron Jobs'],
    },
    {
      title: 'Database',
      skills: ['MongoDB', 'PostgreSQL'],
    },
    {
      title: 'Systems & Tools',
      skills: ['WebSockets', 'Git', 'Stripe API', 'Crypto Payments'],
    },
  ];

  return (
    <StyledSkillsSection id="skills" ref={revealContainer}>
      <h2 className="numbered-heading">Skills &amp; Technologies</h2>

      <div className="inner">
        {skillCategories.map((category, i) => (
          <StyledSkillCategory key={i}>
            <h3>{category.title}</h3>
            <ul>
              {category.skills.map((skill, j) => (
                <li key={j}>{skill}</li>
              ))}
            </ul>
          </StyledSkillCategory>
        ))}
      </div>
    </StyledSkillsSection>
  );
};

export default Skills;
