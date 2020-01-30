{


// sort and get the first element
class PriorityQue {
    constructor() {
        this.values = [];
    }

    enque(val,priority) {
        this.values.push({val,priority});
        this.sort();
    }

    deque() {
        return this.values.shift();
    }

    sort() {
        // sort after every insertion
        this.values.sort( (a,b) => a.priority - b.priority );
    }
}

// weighted graph
class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if(!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }
    
    addEdge(vertex1,vertex2,weight) {
        this.adjacencyList[vertex1].push({
            node:vertex2,
            weight
        });

        this.adjacencyList[vertex2].push({
            node:vertex1,
            weight
        });
    }

    Dijkstra(start,finish) {
        let nodes = new PriorityQue();
        const distance = {};
        const previous = {};
        let smallest;
        let path = []; // to return at end

        // build up initial state
        for(let vertex in this.adjacencyList) {
            if(vertex === start) {
                distance[vertex] = 0;
                nodes.enque(vertex,0);
            }
            else {
                distance[vertex] = Infinity;
                nodes.enque(vertex,Infinity); 
            }
            previous[vertex] = null;
        }

        // as long as there is something to visit
        while(nodes.values.length) {
            smallest = nodes.deque().val;
            
            if(smallest === finish)
            {
                // we are done
                while(previous[smallest]) {
                     // { A : null,C : A , D : C} going backwards and A:null which is start point/smallest
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
               
            }
            if(smallest || distance[smallest] !== Infinity) {
                // finding the neighbours
                for(let neighbourIndex in this.adjacencyList[smallest]) {
                    // find neighbourNode
                    let nextNode = this.adjacencyList[smallest][neighbourIndex];
                    
                    // calculate new distance to neighbourNode
                    let candidate = distance[smallest] + nextNode.weight;
                    let nextNeighbour = nextNode.node;
                    if(candidate < distance[nextNeighbour]) {
                        // updating new smallest distance to neighbour
                        distance[nextNeighbour] = candidate;
                        // updating previous - how we got to neighbour
                        previous[nextNeighbour] = smallest;
                        // enque in priority que with new priority
                        nodes.enque(nextNeighbour,candidate);
                    }
                }
            }    
        }

        return path.concat(smallest).reverse();
    }
}





// creating the weighted graph
var graph = new WeightedGraph();

// adding all the nodes
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

// adding all the distance from each node
graph.addEdge("A","B",4);
graph.addEdge("A","C",2);
graph.addEdge("B","E",3);
graph.addEdge("C","D",2);
graph.addEdge("C","F",4);
graph.addEdge("D","F",1);
graph.addEdge("D","E",3);
graph.addEdge("F","E",1);



console.log(graph.Dijkstra("A","E"));










};
