
mapboxgl.accessToken = 'pk.eyJ1IjoibWlyaWhhem91IiwiYSI6ImNsdzcybWYzMDF6czIyamxyZDk5c2EyeXUifQ.LY6eudk3jxJnIseu8FkQ1w';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    projection: 'globe',
    center: [-98.11334, 39.33770],
    zoom: 2.59
});

map.addControl(new mapboxgl.NavigationControl());

map.on('load', () => {

map.addSource('States-map', {
        "type": "geojson",
        "data": "US-States.geojson",
        generateId: true
    })
})
map.on('load', () => {
    map.addLayer({
        'id': 'States-Map-fill',
        'type': 'fill',
        'source': 'States-map',
        'layout': {},
        'paint': {
                'fill-color': [
                    'match',
                    ['get', 'NAME'], 
                    'Washington', '#e18075',  //  Protective
                    'Nebraska', '#a84a3f', // Very/most restrictive 
                    'New Mexico','#e6ab9e',  //Very Protective   
                    'South Dakota', '#a84a3f', // Very/most restrictive  
                    'Texas', '#a84a3f', // Very/most restrictive
                    'California','#e6ab9e',  //Very Protective  
                    'Kentucky', '#a84a3f', // Very/most restrictive   
                    'Ohio', '#c6554b', //Restrictive
                    'Alabama','#a84a3f', // Very/most restrictive
                    'Georgia', '#a84a3f', // Very/most restrictive    
                    'Wisconsin', '#c6554b', //Restrictive
                    'Oregon','#e6ab9e', //Very Protective 
                    'Pennsylvania', '#c6554b', //Restrictive   
                    'Mississippi', '#a84a3f', // Very/most restrictive 
                    'Missouri','#a84a3f', // Very/most restrictive 
                    'North Carolina', '#a84a3f', // Very/most restrictive    
                    'Oklahoma', '#a84a3f', // Very/most restrictive 
                    'West Virginia','#a84a3f', // Very/most restrictive 
                    'New York', '#e6ab9e',  //Very Protective  
                    'Indiana', '#a84a3f', // Very/most restrictive 
                    'Kansas', '#c6554b', //Restrictive
                    'Idaho', '#a84a3f', // Very/most restrictive    
                    'Nevada', '#cd7369', // Some Restrictions
                    'Vermont','#e6ab9e',  //Very Protective  
                    'Montana', '#e18075',  //  Protective   
                    'Minnesota', '#e6ab9e',  //Very Protective 
                    'North Dakota','#a84a3f', // Very/most restrictive  
                    'Hawaii', '#e18075',  //  Protective 
                    'Arizona', '#a84a3f', // Very/most restrictive 
                    'Delaware','#cd7369', // Some Restrictions
                    'Rhode Island','#cd7369', // Some Restrictions  
                    'Colorado', '#e18075',  //  Protective 
                    'Utah','#a84a3f', // Very/most restrictive 
                    'Virginia', '#c6554b', //Restrictive   
                    'Wyoming', '#c6554b', //Restrictive
                    'Louisiana','#a84a3f', // Very/most restrictive 
                    'Michigan', '#e18075',  //  Protective    
                    'Massachusetts', '#e18075',  //  Protective 
                    'Florida','#a84a3f', // Very/most restrictive 
                    'Connecticut', '#e18075',  //  Protective    
                    'New Jersey', '#e6ab9e',  //Very Protective 
                    'Maryland','#e6ab9e',  //Very Protective 
                    'South Carolina', '#a84a3f', // Very/most restrictive    
                    'Maine', '#e18075',  //  Protective 
                    'New Hampshire','#cd7369', // Some Restrictions 
                    'District of Columbia', '#e18075',  //  Protective   
                    'Iowa', '#c6554b', //Restrictive
                    'Arkansas','#a84a3f', // Very/most restrictive 
                    'Tennessee', '#a84a3f', // Very/most restrictive   
                    'Illinois', '#e18075',  //  Protective 
                    'Alaska','#e18075',  //  Protective 
                    '#CCCCCC'
                ],

                'fill-opacity': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    1, 
                    0.5 
                ]
            }
        })
    })

    let hoveredPolygonId = null

    
    map.on('mousemove', 'States-Map-fill', (e) => {
        if (e.features.length > 0) {

            if (hoveredPolygonId !== null) {
                map.setFeatureState(
                    { source: 'States-map', id: hoveredPolygonId },
                    { hover: false }
                );
            }
            hoveredPolygonId = e.features[0].id;

            map.setFeatureState(
                { source: 'States-map', id: hoveredPolygonId },
                { hover: true }
            );

            map.getCanvas().style.cursor = 'pointer'

            
            map.on('mouseleave', 'States-Map-fill', () => {
        
                if (hoveredPolygonId !== null) {
                    map.setFeatureState(
                        { source: 'States-map', id: hoveredPolygonId },
                        { hover: false }
                    );
                }

                hoveredPolygonId = null;
                
                map.getCanvas().style.cursor = ''
            });

        }
    });

     map.on('click', 'States-Map-fill', (e) => {

        var statename = e.features[0].properties.NAME

        $('#state-name').text(statename)
    });
    map.on('load', () => {
        map.addLayer({
            'id': 'States-Map-line',
            'type': 'line',
            'source': 'States-map',
            'layout': {},
            'paint': {
                'line-color': 'black',
                'line-width': 1
            }
        })
    })
