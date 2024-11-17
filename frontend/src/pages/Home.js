import '../styles/Home.css'

export default () => <>
    <div class="home-container"> 
        <div class="header">
            <h2 class="name">Mark B.</h2>
            <h2 class="access-level">(Standard)</h2>
        </div>

        <div class="building-img">
            BULIDING PICTURE
        </div>

        <div class="chart-display-container">
            <div class="chart-container" id="power">
                <div class="chart">Image</div>
                <h3 class="name"> Power </h3>
            </div>

            <div class="chart-container" id="water">
                <div class="chart">Image</div>
                <h3 class="name"> Water </h3>
            </div>
            
            <div class="chart-container" id="access">
                <div class="chart">Image</div>
                <h3 class="name"> Access </h3>
            </div>
            
            <div class="chart-container" id="carbon">
                <div class="chart">Image</div>
                <h3 class="name"> Carbon </h3>
            </div>
            
            <div class="chart-container" id="cost">
                <div class="chart">Image</div>
                <h3 class="name"> Cost </h3>
            </div>
        </div>
    </div>
</>;