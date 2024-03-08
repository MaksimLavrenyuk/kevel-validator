'use client'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {ChangeEventHandler, useCallback, useMemo, useState} from "react";
import Alert from 'react-bootstrap/Alert';
import {Validator} from "@/components/validator/validator";
import debounce from "lodash/debounce";

export function MetadataValidator() {
    const [value, setValue] = useState('')
    const [errors, setErrors] = useState<string[] | null>(null)
    const validator = useMemo(() => new Validator(), [])
    const schema = useMemo(() => JSON.stringify(validator.schema(), undefined, 4), [])

    const validate = useMemo(() => debounce((input: string) => {
        const result = validator.check(input)

        if (result) {
            setErrors(result)
        } else {
            setErrors(null)
        }
    }, 300), [])

    const changeHandler: ChangeEventHandler<HTMLTextAreaElement> = useCallback((event) => {
        const newValue = event.target.value
        setValue(newValue)
        validate(newValue)
    }, [])

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h1>Валидатор metadata в Kevel</h1>
                    <p>
                        Вставьте metadata для проверки. Дополнительную информацию можно найти
                        {' '}
                        <a
                            href="https://confluence.uzum.com/pages/viewpage.action?pageId=104038572"
                            target="_blank"
                        >
                             здесь
                        </a>
                    </p>
                    <h2>
                        Схема
                    </h2>
                    <Alert variant="light">
                        <code>
                            <pre>
                                {schema}
                            </pre>
                        </code>
                    </Alert>

                    <Form className="mt-4 mb-4">
                        <Form.Label htmlFor="input">Вставьте для проверки:</Form.Label>
                        <Form.Control
                            id="input"
                            isValid={Boolean(value) && !errors}
                            isInvalid={Boolean(value) && Boolean(errors)}
                            value={value}
                            onChange={changeHandler}
                            rows={10}
                            as="textarea"
                            aria-label="With textarea"
                        />
                    </Form>
                    {value && errors && (
                        errors.map((error, index) => (
                            <Alert key={index} variant="danger">
                                {error}
                            </Alert>
                        ))
                    )}
                </Col>
            </Row>
        </Container>
    )
}
