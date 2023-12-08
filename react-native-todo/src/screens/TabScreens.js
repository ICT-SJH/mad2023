import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from '../theme';
import Input from '../components/Input';
import Task from '../components/Task';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar, Dimensions } from 'react-native';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const StyledText = styled.Text`
    font-size: 30px;
`;

export const DiaryList = () => { // 목록 탭
    const Container = styled.SafeAreaView`
        flex: 1;
        background-color: ${({ theme }) => theme.background};
        align-items: center;
        justify-content: flex-start;
    `;
    const Title = styled.Text`
        font-size: 20px;
        font-weight: 600;
        color: ${({ theme }) => theme.main};
        align-self: flex-start;
        margin: 20px;
    `;
    const Menu = styled.View`
        margin-horizontal: 20px;
        margin-bottom: 10px;
        flex-direction: row;
    `
    const MenuItem = styled.Text`
        flex: 1;
        text-align: center;
        font-size: 18px;
        text-decoration-line: underline;
        font-weight: 600;
        color: ${({ theme }) => theme.menu};
    `
    const List = styled.ScrollView`
        flex: 1;
        width: ${({ width }) => width - 40}px;
    `;

    const width = Dimensions.get('window').width;

    const [isReady, setIsReady] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState({});

    const _saveTasks = async tasks => {
        try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        setTasks(tasks);
        } catch (e) {
        console.error(e);
        }
    };
    const _loadTasks = async () => {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));
    };
    const _addTask = () => {
        const ID = Date.now().toString();
        const newTaskObject = {
        [ID]: { id: ID, text2: newTask, completed: false },
        };
        setNewTask('');
        _saveTasks({ ...tasks, ...newTaskObject });
    };
    const _deleteTask = id => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        _saveTasks(currentTasks);
    };
    const _toggleTask = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        _saveTasks(currentTasks);
    };
    const _updateTask = item => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[item.id] = item;
        _saveTasks(currentTasks);
    };
    const _handleTextChange = text2 => {
        setNewTask(text2);
    };
    const _onBlur = () => {
        setNewTask('');
    };
    
    return isReady ? (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={theme.background} // Android only
                />
                <Title>소소하지만, 확실한 행복 💕</Title>
                {/*<Input
                    placeholder="+ Add a Task"
                    value={newTask}
                    onChangeText={_handleTextChange}
                    onSubmitEditing={_addTask}
                    onBlur={_onBlur}
                />*/}
                <List width={width}>
                    {Object.values(tasks)
                        .reverse()
                        .map(item => (
                            <Task
                                key={item.id}
                                item={item}
                                deleteTask={_deleteTask}
                                toggleTask={_toggleTask}
                                updateTask={_updateTask}
                            />
                    ))}
                </List>
            </Container>
        </ThemeProvider>
    ) : (
        <AppLoading
            startAsync={_loadTasks}
            onFinish={() => setIsReady(true)}
            onError={console.error}
        />
    );
};

export const Diary = () => { // 일기장 탭
    const Container = styled.SafeAreaView`
        flex: 1;
        background-color: ${({ theme }) => theme.background};
        align-items: center;
        justify-content: flex-start;
    `;
    const Title = styled.Text`
        font-size: 20px;
        font-weight: 600;
        color: ${({ theme }) => theme.main};
        align-self: flex-start;
        margin: 20px;
    `;
    const Menu = styled.View`
        margin-horizontal: 20px;
        margin-bottom: 10px;
        flex-direction: row;
    `
    const MenuItem = styled.Text`
        flex: 1;
        text-align: center;
        font-size: 18px;
        text-decoration-line: underline;
        font-weight: 600;
        color: ${({ theme }) => theme.menu};
    `
    const List = styled.ScrollView`
        flex: 1;
    `;

    const Diary1 = styled.View`
        width: 90%;
        margin-top: 10px;
        flex-direction: column;
        align-items: center;
        background-color: ${({ theme }) => theme.inputBackground};
        border-radius: 30px;
        border: 2px;
        border-color: #542330;
    `;

    const Diary10 = styled.View`
        width: 100%;
        height: 2px;
        margin-horizontal: 10px;
        background-color: #542330;
    `;

    const Diary111 = styled.View`
        width: 90%;
        align-items: flex-start;
        height: 55%;
    `;

    const Diary11 = styled.TextInput.attrs(({ theme }) => ({
        placeholderTextColor: theme.main,
    }))`
        width: 90%;
        height: 40px;
        margin-vertical: 10px;
        padding: 0px 20px;
        border-radius: 10px;
        font-size: 18px;
        color: ${({ theme }) => theme.text};
    `;

    const Diary12 = styled.View`
        width: 90%;
        flex-direction: row;
        justify-content: space-between;
        margin-vertical: 10px;
        color: ${({ theme }) => theme.text};
    `;

    const Diary121 = styled.Text`
        flex: 1;
        text-align: center;
        font-size: 30px;
        font-weight: 600;
        color: #111111;
    `;

    const Diary2 = styled.View`
        width: 90%;
        margin-top: 10px;
        flex-direction: row;
        align-items: center;
    `;

    const Diary21 = styled.TouchableOpacity`
        flex: 1;
        margin: 0px 5px;
        background-color: #fa5672;
        border-radius: 10px;
        align-items: center;
        justify-content: space-between;
    `

    const Diary211 = styled.Text`
        padding: 10px;
        font-size: 18px;
        font-weight: 600;
        color: #ffffff;
    `

    const width = Dimensions.get('window').width;

    const [isReady, setIsReady] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState({});

    const _saveTasks = async tasks => {
        try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        setTasks(tasks);
        } catch (e) {
        console.error(e);
        }
    };
    const _loadTasks = async () => {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));
    };
    const _addTask = () => {
        const ID = Date.now().toString();
        const newTaskObject = {
        [ID]: { id: ID, text2: newTask, completed: false },
        };
        setNewTask('');
        _saveTasks({ ...tasks, ...newTaskObject });
    };
    const _deleteTask = id => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        _saveTasks(currentTasks);
    };
    const _toggleTask = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        _saveTasks(currentTasks);
    };
    const _updateTask = item => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[item.id] = item;
        _saveTasks(currentTasks);
    };
    const _handleTextChange = text2 => {
        setNewTask(text2);
    };
    const _onBlur = () => {
        setNewTask('');
    };
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
    let date = currentDate.getDate();
    let day = currentDate.getDay();
    let days = ['일', '월', '화', '수', '목', '금', '토'];
    
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={theme.background} // Android only
                />
                <Title>소소하지만, 확실한 행복 💕</Title>
                
                <Diary1>
                    <Diary11
                        placeholder="날짜"
                        defaultValue={year + '년 ' + month + '월 ' + date + '일 ' + '(' + days[day] + ')'}
                    />
                    <Diary10/>
                    <Diary12>
                        <Diary121>🥰</Diary121>
                        <Diary121>😃</Diary121>
                        <Diary121>😐</Diary121>
                        <Diary121>🙁</Diary121>
                        <Diary121>😣</Diary121>
                        <Diary121>😡</Diary121>
                    </Diary12>
                    <Diary10/>
                    <Diary11
                        placeholder="제목"
                    />
                    <Diary10/>
                    <Diary111>
                        <Input
                            placeholder="내용"
                            value={newTask}
                            onChangeText={_handleTextChange}
                            onSubmitEditing={_addTask}
                            onBlur={_onBlur}
                        />
                    </Diary111>
                </Diary1>
                <Diary2>
                    <Diary21>
                        <Diary211>취소</Diary211>
                    </Diary21>
                    <Diary21>
                        <Diary211>저장</Diary211>
                    </Diary21>
                </Diary2>
                <List/>
            </Container>
        </ThemeProvider>
    );
};

export const FeelStat = () => { // 기분 통계 탭
    const Container = styled.SafeAreaView`
        flex: 1;
        background-color: ${({ theme }) => theme.background};
        align-items: center;
        justify-content: flex-start;
    `;
    const Title = styled.Text`
        font-size: 20px;
        font-weight: 600;
        color: ${({ theme }) => theme.main};
        align-self: flex-start;
        margin: 20px;
    `;
    const Menu = styled.View`
        margin-horizontal: 20px;
        margin-bottom: 10px;
        flex-direction: row;
    `
    const MenuItem = styled.Text`
        flex: 1;
        text-align: center;
        font-size: 18px;
        text-decoration-line: underline;
        font-weight: 600;
        color: ${({ theme }) => theme.menu};
    `
    const List = styled.ScrollView`
        flex: 1;
        width: ${({ width }) => width - 40}px;
    `;

    const Stat1 = styled.View`
        width: 90%;
        margin-top: 10px;
        flex-direction: column;
        align-items: center;
        background-color: ${({ theme }) => theme.itemBackground};
        border-radius: 30px;
        padding: 10px;
    `;

    const Contents = styled.Text`
        padding-top: 10px;
        font-size: 24px;
        font-weight: 600;
        text-align: center;
        color: ${({ theme, completed }) => (completed ? theme.done : theme.text)};
        text-decoration-line: ${({ completed }) =>
            completed ? 'line-through' : 'none'};
    `;

    const Stat11 = styled.Text`
        padding-top: 10px;
        font-size: 48px;
        font-weight: 600;
        text-align: center;
        color: ${({ theme, completed }) => (completed ? theme.done : theme.text)};
        text-decoration-line: ${({ completed }) =>
            completed ? 'line-through' : 'none'};
    `;

    const Stat12 = styled.View`
        width: 90%;
        margin-top: 20px;
        flex-direction: column;
        align-items: center;
        border-radius: 30px;
    `;

    const Stat121 = styled.Text`
        font-size: 24px;
        font-weight: 600;
        text-align: center;
        color: ${({ theme, completed }) => (completed ? theme.done : theme.text)};
        text-decoration-line: ${({ completed }) =>
            completed ? 'line-through' : 'none'};
    `;

    const Stat2 = styled.View`
        width: 90%;
        margin-top: 10px;
        flex-direction: column;
        align-items: center;
    `;

    const Stat20 = styled.View`
        width: 90%;
        margin-vertical: 10px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    `;

    const Stat21 = styled.Text`
        width: 18%;
        font-size: 30px;
        font-weight: 600;
        text-align: left;
        color: ${({ theme, completed }) => (completed ? theme.done : theme.text)};
        text-decoration-line: ${({ completed }) =>
            completed ? 'line-through' : 'none'};
    `;

    const Stat22 = styled.View`
        border-top-start-radius: 30px;
        border-bottom-start-radius: 30px;
        height: 30px;
        background-color: #fa5672;
    `;

    const Stat23 = styled.View`
        border-top-end-radius: 30px;
        border-bottom-end-radius: 30px;
        height: 30px;
        background-color: #fff0f0;
    `;

    const width = Dimensions.get('window').width;

    const [isReady, setIsReady] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState({});

    const _saveTasks = async tasks => {
        try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        setTasks(tasks);
        } catch (e) {
        console.error(e);
        }
    };
    const _loadTasks = async () => {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));
    };
    const _addTask = () => {
        const ID = Date.now().toString();
        const newTaskObject = {
        [ID]: { id: ID, text2: newTask, completed: false },
        };
        setNewTask('');
        _saveTasks({ ...tasks, ...newTaskObject });
    };
    const _deleteTask = id => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        _saveTasks(currentTasks);
    };
    const _toggleTask = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        _saveTasks(currentTasks);
    };
    const _updateTask = item => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[item.id] = item;
        _saveTasks(currentTasks);
    };
    const _handleTextChange = text2 => {
        setNewTask(text2);
    };
    const _onBlur = () => {
        setNewTask('');
    };
    
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={theme.background} // Android only
                />
                <Title>소소하지만, 확실한 행복 💕</Title>
                
                <Stat1>
                    <Contents>이번 주는 기분이 4번 좋음이었어요!</Contents>
                    <Stat11>😃</Stat11>
                </Stat1>
                <Stat12>
                    <Stat121>주간 통계</Stat121>
                </Stat12>
                <Stat2>
                    <Stat20><Stat21>🥰</Stat21><Stat22 width={"24%"}/><Stat23 width={"48%"}/></Stat20>
                    <Stat20><Stat21>😃</Stat21><Stat22 width={"40%"}/><Stat23 width={"32%"}/></Stat20>
                    <Stat20><Stat21>😐</Stat21><Stat22 width={"8%"}/><Stat23 width={"64%"}/></Stat20>
                    <Stat20><Stat21>🙁</Stat21><Stat22 width={"16%"}/><Stat23 width={"56%"}/></Stat20>
                    <Stat20><Stat21>😣</Stat21><Stat22 width={"8%"}/><Stat23 width={"64%"}/></Stat20>
                    <Stat20><Stat21>😡</Stat21><Stat22 width={"8%"}/><Stat23 width={"64%"}/></Stat20>
                </Stat2>

            </Container>
        </ThemeProvider>
    );
};
