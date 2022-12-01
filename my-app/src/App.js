import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Card,Image } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';

function App() {

  const [ImageData, setImageData] = useState('')
  const [file, setFile] = useState();

  let handleFileChanges = async (event) => {
    const file = event.target.files[0]
    setFile(URL.createObjectURL(event.target.files[0]));
    const base64 = await convertBase64(file)
    console.log(base64);
    let abc = base64.split(',')[1]
    setImageData(abc)
    console.log(base64.split(','));
    console.log(abc);
  }

  let convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  const handleSave = () => {
    axios.post('https://caption-qedrkn2beq-uc.a.run.app/caption_generator', {
      image: ImageData
    }).then(res => {
	let data = res.data.text.split(" ").slice(1,-1).join(' ');
	
	let title=document.getElementById("title");
  	title.innerHTML = "Generated Text - "+data;
    })
  }

  return (



<center>	
    <div style={{ 
      backgroundImage: 'url("https://img.freepik.com/free-vector/copy-space-wavy-white-background-layers_23-2148845469.jpg?w=2000")' ,
	padding: "50px",textAlign: "center",backgroundColor: "#474e5d",color: "black"
    }}>
	<h1 style={{textAlign:"center",
     marginBottom: "2cm"
  }}>Image Caption Generator</h1>
      <Card>
        <Card.Header>Upload File</Card.Header>
	
      <Card.Body >
      
      <center><input type={'file'} onChange={(e) => { handleFileChanges(e); }} />
      <Image src={file} /></center>
      </Card.Body>
      <Card.Footer>
      <Button onClick={() => { handleSave(); }}>Generate Text</Button>
      </Card.Footer>
      </Card>

      <br/>

	<Card>
      <center><h4 id="title" ></h4></center>
     </Card>
	<br/>
	<Card>
	<h2 style={{textAlign:"center",
     marginTop: "1cm"
  }}>Our Team</h2>
<div class="row">
  <div style={{
  float: "left",
  width: "25%",
  marginBottom: "16px",
  padding: "0 8px"
}}>
    <Card>
      <center><img src={require("./pankaj.jpeg")} width="300" height="300"/></center>
      <div style={{
  padding: "0 16px"
}}>
        <h2>Pankaj Balchandani</h2>
        <p class="title">Data Scientist</p>
        <p>Exploring ways to apply ML solutions in various domains like medical, insurance, retail and logistics.</p>
        <p>Pankaj.balchandani.77@gmail.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </Card>
  </div>



  <div style={{
  float: "left",
  width: "25%",
  marginBottom: "16px",
  padding: "0 8px"
}}>
    <Card>
      <center><img src={require("./jai.jpg")} width="300" height="300"/></center>
      <div style={{
  padding: "0 16px"
}}>
        <h2>Jai Saxena</h2>
        <p class="title">Aspiring Data Scientist</p>
        <p>Excited to explore the world of data and apply my knowledge and skills of data science into creating advanced AI and ML applications.</p>
        <p>jaisaxena16@gmail.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </Card>
  </div>


  <div style={{
  float: "left",
  width: "25%",
  marginBottom: "16px",
  padding: "0 8px"
}}>
    <Card>
      <center><img src={require("./durgesh.jpeg")} width="300" height="300"/></center>
      <div style={{
  padding: "0 16px"
}}>
        <h2>Durgesh Mishra</h2>
        <p class="title">Research Scholar</p>
        <p>Passionate about research in computational science & building solution using data driven methods.</p>
        <p>durgesh_mishra@daiict.ac.in</p>
        <p><button class="button">Contact</button></p>
      </div>
    </Card>
  </div>


  <div style={{
  float: "left",
  width: "25%",
  marginBottom: "16px",
  padding: "0 8px"
}}>
    <Card>
      <center><img src={require("./niranjan.png")} width="300" height="300"/></center>
      <div style={{
  padding: "0 16px"
}}>
        <h2>Niranjan Solanki</h2>
        <p class="title">Data Scientist</p>
        <p>Passionate about application in AI</p>
        <p>niranjan.r.solanki@gmail.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </Card>
  </div>


	</div>
</Card>
    </div>
</center>



	

  );
}

export default App;
