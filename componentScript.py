import sys

def main():
	# path name that the file will be at ie: src/components
	print '''Please put the file path to where you want you component.
For instance, if you were in the src folder and you wanted to put the component in the components folder, you would input components/'''
	path = sys.stdin.readline().strip()
	# name of the file that you want to use. it will be the name of the file as well as the component
	print 'Please input the name of the component that you wish to create'
	name = sys.stdin.readline().strip()
	f = open(path +name + '.js', "w")
	f.write("""'use strict';\n

var React = require('react'); 

var %s = React.createClass( function() {
	render: function() {
		return (

		)
	}

});

module.exprts = %s;""" % (name, name))
	f.close()

main()