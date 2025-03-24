import React from 'react'
import Nav from '../components/Nav'
import NoteCard from '../cards/NoteCard'

const Home = () => {
  return (
    <>
      <Nav />

      <div className='p-8 mx-auto'>
        <div className='grid grid-cols-3 gap-4'>
          <NoteCard
            title="Meeting Notes"
            date="12 March 2025"
            content="Discussed project roadmap and upcoming milestones."
            tags="#meeting #project"
            isPinned={true}
          />
          <NoteCard
            title="Shopping List"
            date="15 March 2025"
            content="Buy milk, eggs, and bread from the grocery store."
            tags="#personal #shopping"
            isPinned={false}
          />
          <NoteCard
            title="Workout Plan"
            date="10 March 2025"
            content="Leg day: Squats, lunges, and deadlifts."
            tags="#fitness #health"
            isPinned={false}
          />
          <NoteCard
            title="Book Summary"
            date="20 February 2025"
            content="Key takeaways from 'Atomic Habits' by James Clear."
            tags="#books #learning"
            isPinned={true}
          />
          <NoteCard
            title="Daily Journal"
            date="5 March 2025"
            content="Reflections on today's events and thoughts."
            tags="#journal #reflection"
            isPinned={false}
          />
          <NoteCard
            title="Project Ideas"
            date="8 March 2025"
            content="Brainstorming new ideas for SaaS applications."
            tags="#development #ideas"
            isPinned={true}
          />
        </div>
      </div>
    </>
  )
}

export default Home