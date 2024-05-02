import React, { useEffect, useState } from 'react'
import './Home.css'
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import AddForm from '../../Components/Form/AddForm'
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { saveTodoTask, saveOngoingTask, saveCompletedTask } from '../../Store/todoSlice';

export default function Home() {
    const dispatch = useDispatch();
    const todoData = useSelector((state) => state.menu.todoTask)
    const ongoingData = useSelector((state) => state.menu.ongoingTask)
    const completedData = useSelector((state) => state.menu.completedTask)
    console.log(todoData, ongoingData, completedData);

    var ToDoCard = [
        { id: uuidv4(), Title: "Frontend Task", Description: "This is the example of sescription which will have minimum 25 char" },
        { id: uuidv4(), Title: "Other Task", Description: "This is the example of sescription which will have minimum 25 char" }
    ];

    var OngoingCard = [
        { id: uuidv4(), Title: "Old Task", Description: "This is the example of sescription which will have minimum 25 char" },
        { id: uuidv4(), Title: "Problem Reading", Description: "This is the example of sescription which will have minimum 25 char" }
    ];

    var CompletedCard=  [
        { id: uuidv4(), Title: "Project Enhancements", Description: "This is the example of sescription which will have minimum 25 char" },
        { id: uuidv4(), Title: "New Learnings", Description: "This is the example of sescription which will have minimum 25 char" },
        { id: uuidv4(), Title: "Excercise", Description: "This is the example of sescription which will have minimum 25 char" }
    ]

    const [form, setForm] = useState(false)
    const [cardData, setcardData] = useState({})
    // const [ToDoCard, setToDoCard] = useState([
    //     { id: uuidv4(), Title: "Frontend Task", Description: "This is the example of sescription which will have minimum 25 char" },
    //     { id: uuidv4(), Title: "Other Task", Description: "This is the example of sescription which will have minimum 25 char" }
    // ]);
    // const [OngoingCard, setOngoingCard] = useState([
    //     { id: uuidv4(), Title: "Old Task", Description: "This is the example of sescription which will have minimum 25 char" },
    //     { id: uuidv4(), Title: "Problem Reading", Description: "This is the example of sescription which will have minimum 25 char" }
    // ]);
    // const [CompletedCard, setCompletedCard] = useState([
    //     { id: uuidv4(), Title: "Project Enhancements", Description: "This is the example of sescription which will have minimum 25 char" },
    //     { id: uuidv4(), Title: "New Learnings", Description: "This is the example of sescription which will have minimum 25 char" },
    //     { id: uuidv4(), Title: "Excercise", Description: "This is the example of sescription which will have minimum 25 char" }
    // ]
    // );

    useEffect(() => {
        if (cardData.selectColumn === "todo") {
            // setToDoCard(prevToDoCard => [...prevToDoCard, cardData]);
            ToDoCard = [...ToDoCard,cardData]
        } else if (cardData.selectColumn === 'doing') {
            // setOngoingCard(prevToDoCard => [...prevToDoCard, cardData]);
            OngoingCard = [...OngoingCard,cardData]
        } else if (cardData.selectColumn === 'done') {
            // setCompletedCard(prevToDoCard => [...prevToDoCard, cardData]);
            CompletedCard = [...CompletedCard, cardData]
        }

        dispatch(saveTodoTask({ todoTask: ToDoCard }))
        dispatch(saveOngoingTask({ ongoingTask: OngoingCard }))
        dispatch(saveCompletedTask({ completedTask: CompletedCard }))

    }, []);

    const handleDragStart = (e, card, sourceColumn) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({ card, sourceColumn }));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetColumn) => {
        e.preventDefault();
        const { card, sourceColumn } = JSON.parse(e.dataTransfer.getData('text/plain'));
        let updatedToDoCard = [...ToDoCard];
        let updatedOngoingCard = [...OngoingCard];
        let updatedCompletedCard = [...CompletedCard];

        switch (sourceColumn) {
            case 'ToDo':
                updatedToDoCard = ToDoCard.filter((c) => c.id !== card.id);
                // setToDoCard(updatedToDoCard)
                dispatch(saveTodoTask({ todoTask: updatedToDoCard }))

                break;
            case 'Ongoing':
                updatedOngoingCard = OngoingCard.filter((c) => c.id !== card.id);
                // setOngoingCard(updatedOngoingCard)
                dispatch(saveOngoingTask({ ongoingTask: updatedOngoingCard }))

                break;
            case 'Completed':
                updatedCompletedCard = CompletedCard.filter((c) => c.id !== card.id);
                // setCompletedCard(updatedCompletedCard)
                dispatch(saveCompletedTask({ completedTask: updatedCompletedCard }))

                break;
            default:
                break;
        }

        switch (targetColumn) {
            case 'ToDo':
                const newTodo = [...updatedToDoCard, card]
                // setToDoCard([...updatedToDoCard, card]);
                dispatch(saveTodoTask({ todoTask: newTodo }))
                break;
            case 'Ongoing':
                const newOngoing = [...updatedOngoingCard, card]
                // setOngoingCard([...updatedOngoingCard, card]);
                dispatch(saveOngoingTask({ ongoingTask: newOngoing }))

                break;
            case 'Completed':
                const newCompleted = [...updatedCompletedCard, card]
                // setCompletedCard([...updatedCompletedCard, card]);
                dispatch(saveCompletedTask({ completedTask: newCompleted }))

                break;
            default:
                break;
        }
    };

    return (
        <Container  >
            <Row>
                <Col className='columns' xs={12} md={4} onDrop={(e) => handleDrop(e, 'ToDo')} onDragOver={handleDragOver}>
                    <h2 className='heading'>To Do</h2>
                    {todoData.map((el, index) => (
                        <Card
                            key={index}
                            draggable
                            onDragStart={(e) => handleDragStart(e, el, 'ToDo')}
                            style={{ border: "1px solid red", marginBottom: '10px', cursor: 'pointer' }}
                        >
                            <Card.Body>
                                <Card.Title>{el.Title}</Card.Title>
                                <Card.Text>{el.Description}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>

                <Col className='columns' xs={12} md={4} onDrop={(e) => handleDrop(e, 'Ongoing')} onDragOver={handleDragOver}>
                    <h2 className='heading'>Ongoing Task</h2>
                    {ongoingData.map((el, index) => (
                        <Card
                            key={index}
                            draggable
                            onDragStart={(e) => handleDragStart(e, el, 'Ongoing')}
                            style={{ border: "1px solid red", marginBottom: '10px', cursor: 'pointer' }}
                        >
                            <Card.Body>
                                <Card.Title>{el.Title}</Card.Title>
                                <Card.Text>{el.Description}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>

                <Col className='columns' xs={12} md={4} onDrop={(e) => handleDrop(e, 'Completed')} onDragOver={handleDragOver}>
                    <h2 className='heading'>Completed</h2>
                    {completedData.map((el, index) => (
                        <Card
                            key={index}
                            draggable
                            onDragStart={(e) => handleDragStart(e, el, 'Completed')}
                            style={{ border: "1px solid red", marginBottom: '10px', cursor: 'pointer' }}
                        >
                            <Card.Body>
                                <Card.Title>{el.Title}</Card.Title>
                                <Card.Text>{el.Description}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>

            <Button style={{ color: "black", backgroundColor: "unset", margin: "2rem", maxWidth: "100px" }}
                onClick={() => setForm(true)}>Add Card</Button>
            {
                <div className='formdiv'>
                    {
                        form && <AddForm setcardData={setcardData} setForm={setForm} />
                    }
                </div>
            }
        </Container>
    )
}


