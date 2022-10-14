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

    const [searchText, setSearchText] = useState('');

    function inputTextOnChange(event){
        setSearchText(event.target.value);
    }

    function handleCheck(data){

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
            props.setData((before) => {
                let after = {};
                after.checkedData = removeFromArray(before.checkedData);
                after.uncheckedData = addToArray(before.uncheckedData);
                return after;
            });
        } else {
            props.setData((before) => {
                let after = {};
                after.uncheckedData = removeFromArray(before.uncheckedData);
                after.checkedData = addToArray(before.checkedData);
                return after;
            });
        }
        
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

        toReturn.push(...props.data.checkedData.map((data) => {
            return(returnElement(data));
        }));

        toReturn.push(...props.data.uncheckedData.map((data) => {
            if (data.value.search(searchText) != -1) {
                return (returnElement(data));
            }
        }));

        return toReturn;

    }

    function handleClearAll(){

        props.setData((before) => {
            let after = {};
            let holdCheckedData = [...before.checkedData];
            holdCheckedData.forEach((element, index) => {
                holdCheckedData[index].checked = false;
            });
            after.uncheckedData = [...holdCheckedData, ...before.uncheckedData];
            after.checkedData = [];
            return after;
        });

    }

    function handleChooseAll(){

        props.setData((before) => {
            let after = {};
            let holdUncheckedData = [...before.uncheckedData];
            holdUncheckedData.forEach((element, index) => {
                holdUncheckedData[index].checked = true;
            });
            after.checkedData = [...before.checkedData, ...holdUncheckedData];
            after.uncheckedData = [];
            return after;
        });

    }

    return(
        <div className={styles.filterBoxContainer}>
            <input type='text' onChange={inputTextOnChange}/>
            <div className={styles.elementListContainer}>
                {(props.data.uncheckedData.length === 0 && props.data.checkedData.length === 0) ? <p>loading...</p> : getFilterElementList()}
            </div>
            <div className={styles.filterBoxButtonContainer}>
                <button onClick={handleClearAll}>Clear All</button>
                <button onClick={handleChooseAll}>Choose All</button>
            </div>
        </div>
    );
}