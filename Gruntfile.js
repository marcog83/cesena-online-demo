/**
 * Created by marco.gobbi on 11/11/2014.
 */

module.exports = function (grunt) {

    grunt.loadTasks('./grunt-tasks/tasks');
    var path = require('path');

    require('load-grunt-config')(grunt, {
        // path to task.js files, defaults to grunt dir
        configPath: path.join(process.cwd(), 'grunt-tasks/config'),

        loadGruntTasks: {
            pattern: 'grunt-*',
            config: require('./package.json'),
            scope: 'devDependencies'
        }

    });


}
;