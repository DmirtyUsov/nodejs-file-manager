# nodejs-file-manager
RS School Task. Implement File Manager using Node.js APIs.

## How to run  
`git clone git@github.com:DmirtyUsov/nodejs-file-manager.git`  
`git switch dev`  
`npm run start -- --username=Nemo`

## Commands  
`.exit`, `up`, `ls`  
`os` with arguments: --EOL, --cpus, --homedir, --username, --architecture  
`cd` `cat`, `add`, `rm`, `hash` with path  
`rn`, `cp`, `mv`, `compress`, `decompress` with path_to_source path_to_destination 

## Implementation Notes
You can use double quotes `cd "dirname with spaces"`  
The `add` command does NOT overwrite existing files. If a file with the specified name already exists, the operation will fail.
The `cp` and `mv` commands will NOT create a target directory if it does not exist. The second argument of these commands is a directory, not a filename.  
For the `compress` and `decompress` commands, the second argument `path_to_destination` should be a path with a filename.