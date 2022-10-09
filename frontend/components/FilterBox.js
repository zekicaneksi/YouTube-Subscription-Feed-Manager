import { useEffect, useState } from 'react';
import styles from './FilterBox.module.css';

function FilterElement (props){
    return(
        <div className={styles.filterElementContainer}>
            <p>{props.data.value}</p>
            <input type='checkbox' checked={props.data.checked ? true : false} onChange={() => {props.handleCheck(props.data)}}/>
        </div>
    );
}

export default function FilterBox(props){

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({uncheckedData: [], checkedData: []});
    const [searchText, setSearchText] = useState('');

    async function getDummyData(){
        let toReturn = [];
        for(let i = 0; i < 50; i++){
            let toPush = Object.create({});
            toPush.value = "data" + i;
            toPush.checked = false;
            toReturn.push(toPush);
        }
        setLoading(false);
        setData((before) => {
            let after = {...before};
            after.uncheckedData = toReturn;
            return after;})
    }

    useEffect(() => {
        getDummyData();
    },[]);

    function inputTextOnChange(event){
        setSearchText(event.target.value);
    }

    function handleCheck(data){
        props.setFilterLoading(true);

        function removeFromArray(array){
            return array.filter((value) => value.value != data.value);
        }

        function addToArray(array){
            let holdData = {...data};
            holdData.checked = !holdData.checked;
            if(holdData.checked) return [...array, holdData];
            else return [holdData, ...array];
        }

        if(data.checked){
            setData((before) => {
                let after = {};
                after.checkedData = removeFromArray(before.checkedData);
                after.uncheckedData = addToArray(before.uncheckedData);
                return after;
            });
        } else {
            setData((before) => {
                let after = {};
                after.uncheckedData = removeFromArray(before.uncheckedData);
                after.checkedData = addToArray(before.checkedData);
                return after;
            });
        }
        
        props.setFilterLoading(false);
    }

    function getFilterElementList() {

        function returnElement(data) {
            return (
                <FilterElement
                    key={data.value}
                    data={data}
                    handleCheck={handleCheck}/>
            );
        }

        let toReturn = [];

        toReturn.push(...data.checkedData.map((data) => {
            return(returnElement(data));
        }));

        toReturn.push(...data.uncheckedData.map((data) => {
            if (data.value.search(searchText) != -1) {
                return (returnElement(data));
            }
        }));

        return toReturn;

    }

    function handleClearAll(){
        props.setFilterLoading(true);

        setData((before) => {
            let after = {};
            let holdCheckedData = [...before.checkedData];
            holdCheckedData.forEach((element, index) => {
                holdCheckedData[index].checked = false;
            });
            after.uncheckedData = [...holdCheckedData, ...before.uncheckedData];
            after.checkedData = [];
            return after;
        });

        props.setFilterLoading(false);
    }

    function handleChooseAll(){
        props.setFilterLoading(true);

        setData((before) => {
            let after = {};
            let holdUncheckedData = [...before.uncheckedData];
            holdUncheckedData.forEach((element, index) => {
                holdUncheckedData[index].checked = true;
            });
            after.checkedData = [...before.checkedData, ...holdUncheckedData];
            after.uncheckedData = [];
            return after;
        });

        props.setFilterLoading(false);
    }

    return(
        <div className={styles.filterBoxContainer}>
            <input type='text' onChange={inputTextOnChange}/>
            <div className={styles.elementListContainer}>
                {(loading === true ? <p>loading...</p> : getFilterElementList())}
            </div>
            <div className={styles.filterBoxButtonContainer}>
                <button onClick={handleClearAll}>Clear All</button>
                <button onClick={handleChooseAll}>Choose All</button>
            </div>
        </div>
    );
}