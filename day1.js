/*static data*/

const TableData = [
    {category:"Work",sub_category:"Meeting",duration:"42:12",task:"ClientMeeting"},
    {category:"Work",sub_category:"Project",duration:"50:44",task:"-"},
    {category:"Work",sub_category:"Meeting",duration:"42:12",task:"ClientMeeting"},
    {category:"PersonalWork",sub_category:"Meeting",duration:"-",task:"-"},
    {category:"PersonalWork",sub_category:"Project",duration:"20:58",task:"-"},
    {category:"Work",sub_category:"Meeting",duration:"42:12",task:"ClientMeeting"},
    {category:"PersonnalWork",sub_category:"Meeting",duration:"55:12",task:"-"},
    {category:"Work",sub_category:"Meeting",duration:"42:12",task:"ClientMeeting"},
    {category:"Work",sub_category:"-",duration:"10:10",task:"-"},
];

        const tablecontent = document.querySelector('#dataTable tbody');
        const select = document.getElementById('drops');

        //fetching data from TableData into table
        function createTable(category) {
            tablecontent.innerHTML = ''; 
            TableData.forEach((data,index) => {
                if (data.category === category) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${data.category}</td>
                        <td>${data.sub_category}</td>
                        <td>${data.duration}</td>
                        <td>${data.task}</td>
                    `;
                    //update and delete setup
                    const updateBtn = document.createElement('button');
                    updateBtn.textContent = 'Update';
                    updateBtn.classList.add('update-btn'); 
                    updateBtn.addEventListener('click', () => handleUpdate(index)); 

                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Delete';
                    deleteBtn.classList.add('delete-btn'); 
                    deleteBtn.addEventListener('click', () => handleDelete(index));
                    
                    row.appendChild(updateBtn);
                    row.appendChild(deleteBtn);
                    tablecontent.appendChild(row);
                }
                if (category === 'All') {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${data.category}</td>
                        <td>${data.sub_category}</td>
                        <td>${data.duration}</td>
                        <td>${data.task}</td>
                    `;
                    //update and delete setup
                    const updateBtn = document.createElement('button');
                    updateBtn.textContent = 'Update';
                    updateBtn.classList.add('update-btn'); 
                    updateBtn.addEventListener('click', () => handleUpdate(index)); 

                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Delete';
                    deleteBtn.classList.add('delete-btn'); 
                    deleteBtn.addEventListener('click', () => handleDelete(index));

                    row.appendChild(updateBtn);
                    row.appendChild(deleteBtn);
                    
                    tablecontent.appendChild(row);
                }
            });
        }
        createTable(select.value);
        select.addEventListener('change', function() {
            const selectedCategory = this.value;
            createTable(selectedCategory);
        });

        //update function

        function handleUpdate(index) {
            const newData = { 
                category: prompt("Enter new category") || TableData[index].category,
                sub_category: prompt("Enter new sub category") || TableData[index].sub_category,
                duration: prompt("Enter new duration") || TableData[index].duration,
                task: prompt("Enter new task") || TableData[index].task
            };
            TableData.splice(index, 1, newData);
            createTable(select.value);
        }
        
        //delete function

        function handleDelete(index) {
            TableData.splice(index, 1);
            createTable(select.value);
        }
        
        createTable(select.value); 
        select.addEventListener('change', function () {
            const selectedValue = this.value;
            createTable(selectedValue);
        });

        //add task function

        function addTask(){
            const category = document.forms["form"]["Category"].value;
            const subcategory = document.forms["form"]["Subcategory"].value;
            const duration = document.forms["form"]["Duration"].value;
            const tasks = document.forms["form"]["Tasks"].value;

            const newtask = {
                category : category,
                sub_category : subcategory,
                duration : duration,
                task : tasks,
            }
            if(newtask.category != null && newtask.sub_category != null && newtask.duration != null && newtask.task != null){
                TableData.push(newtask);
            }
    
            createTable(select.value); 
            select.addEventListener('change', function () {
            const selectedValue = this.value;
            createTable(selectedValue);
        });
        }

        //stopwtach setup
        seconds=0;
        minutes=0;
        hour=0;
        isRunning=false;

        function startstopwatch(){
        if(!isRunning){
        
            interval=setInterval(()=>{
                seconds++;
                if(seconds>=60){
                    seconds=0;
                    minutes++;
                    if(minutes>=60){
                        minutes=0;
                        hour++;
                    }
                }
                document.getElementById('button').innerHTML='Stop';
                let formattedTime=`${hour.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
                document.querySelector(".stopwatch").innerHTML=formattedTime;
                isRunning=true;
            },1000)
        
        }
        else{
        isRunning=false;
        clearInterval(interval);
        document.getElementById('button').innerHTML='Start';
        const stopwatchtime = document.querySelector(".stopwatch").textContent
        document.forms["form"]["Duration"].value = stopwatchtime;
        }
    }                                            

        const resetwatch=() => {
            clearInterval(interval);
            seconds=0;
            minutes=0;
            hour=0;
            document.getElementById('button').innerHTML='Start';
            let formattedTime=`${hour.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
            document.querySelector(".stopwatch").innerHTML=formattedTime;
        }
