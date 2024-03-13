import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {  ScrollView  } from 'react-native';
import axios from 'axios';
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const MyComponent = () => {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        const farmers = async () => {
            try {
                let response = await axios.get('http://localhost:5000/customers')
                console.log(response.data)
                response = response.data.filter(item => {
                    return item.role !== 'superuser';

                })

                setData(response)
                response = response.data


            } catch (err) {
                console.log(err)

            }
        }
        farmers()
    }, [])

    return (
        <ScrollView>
            {data.map(item => (
                <Card key={item._id}>
                    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
                    <Card.Content>
                        <Title>Card title</Title>
                        <Paragraph>{item.email}</Paragraph>
                    </Card.Content>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Actions>
                        <Button >Products</Button>
                        <Button>Detail</Button>
                    </Card.Actions>
                </Card>))}
        </ScrollView>
    )
};

export default MyComponent;