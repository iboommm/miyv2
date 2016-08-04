<?php
        
    if(!defined("CHK_ADMIN")) {
        exit("Access Denied");
    }

    /* Login Module */

    class Admin {
        
        private $key;
        
        function __contruct($key){
            $this->setKeyAPI($key);
        }
        
        public function setKeyAPI($key) {
            $this->key = $key;
        }
        
        public function getKeyAPI() {
            return $this->key;
        }
        
        private function checkAPIkey() {
            if(!$_session['key-log']) {
                return false;
            }else {
                if($_session['key-log'] == $this->$key ) {
                    return 1;
                }
                return false;
            }
        }
        
        
    }
    
    /* Login Module */