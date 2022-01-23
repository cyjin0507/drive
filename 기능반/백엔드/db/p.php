<?php
class Session
{
    public function set($type, $value)
    {
        $_SESSION[$type] = $value;
    }

    public function has($type)
    {
        return isset($_SESSION[$type]);
    }

    public function remove($type)
    {
        unset($_SESSION[$type]);
    }
}