const Note = ({ note }) => {
    return (
      <li>{note.content}</li>
    )
  }
  
  export default Note

  // import Note from './components/Note'

// const App = (props) => {
//   const [notes, setNotes] = useState(props.notes)
//   const [newNote, setNewNote] = useState('')
//   const [showAll, setShowAll] = useState(true)

//   const addNote = (event) => {
//     event.preventDefault();
//     const noteObject = {
//       content: newNote,
//       important: Math.random() < 0.5,
//       id: notes.length + 1,
//     }

//     setNotes([...notes, noteObject]);
//     setNewNote('')
//   }

//   const handleNoteChange = () => {
//     setNewNote(event.target.value);
//   }

//   const notesToShow = showAll
//     ? notes
//     : notes.filter(note => note.important === true)

//   return (
//     <div>
//       <h1>Notes</h1>
//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? 'important' : 'all' }
//         </button>
//       </div>
//       <ul>
//         {notesToShow.map(note =>
//           <Note key={note.id} note={note} />
//         )}
//       </ul>
//       <form onSubmit={addNote}>
//         <input value={newNote} onChange={handleNoteChange}/>
//         <button type="submit">save</button>
//       </form>
//     </div>
//   )