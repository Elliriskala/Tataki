import {replace} from 'replace-in-file';

const options = {
  files: 'build/**/*.js',
  from: /from '(\..*)'/g,
  to: (match, p1) => `from '${p1}.js'`,
};

replace(options)
  .then(results => {
    console.log('Replacement results:', results);
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });