<?php
        
    if(!defined("CHK_ADMIN")) {
        exit("Access Denied");
    }

    /* Login Module */

    class Admin {
        
        private $key;
        
        public function setKeyAPI($key) {
            $this->key = $key;
        }
        
        public function getKeyAPI() {
            return $this->key;
        }
        
        public function checkAPIkey() {
            if(!$_SESSION['key-log']) {
                return false;
            }else {
                if($_SESSION['key-log'] == $this->key ) {
                    return true;
                }
                return false;
            }
        }
        public function getSetting() {
            
        }
        
        
    }
    
    /* Login Module */