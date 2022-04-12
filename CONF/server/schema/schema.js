const graphql = require('graphql');
const_= require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema,GraphQLList} = graphql;

//dummy data
var attributes=[
	{AttributeCode:'abv', DefaultLabel:'ABV', Visible:'Yes', Searchable:'No', Useinfacetedsearch:'Yes' },
	{AttributeCode:'author', DefaultLabel:'AUTHOR', Visible:'Yes', Searchable:'Yes', Useinfacetedsearch:'Yes' },
    {AttributeCode:'related-products', DefaultLabel:'Related products', Visible:'Yes', Searchable:'No', Useinfacetedsearch:'No' },
];
const AttributeType = new GraphQLObjectType({
name: 'Attribute',
fields: ()=> ({
    AttributeCode:{type:GraphQLString},
    DefaultLabel: {type:GraphQLString},
    Visible:{type:GraphQLString},
    Searchable:{type:GraphQLString},
    Useinfacetedsearch:{type:GraphQLString}
   })
});

const RootQuery = new GraphQLObjectType({

    name: 'RootQueryType',
    fields: {
        AttributeType:{ 
            type: new GraphQLList(AttributeType),
			resolve(parent, args){
			return attributes
			}
        },
        Attributes:{
            type: AttributeType,
            args: {id: {type: graphql.GraphQLID}},
            resolve(parent, args){
                //code to ger data from db/other sorce
                return_.find(books,{id: args.id});
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
})