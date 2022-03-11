<?php

namespace src\App;

class View
{
	private $content = "";

	public function __construct($page)
	{
		$this->content = file_get_contents(__VIEW . __DS . $page . '.php');

		$this->content = preg_replace_callback('/@include\(\"([^()]+)\"\)/', function($matches) {
			return self::loadTemplate($matches[1]);
		}, $this->content);
	}

	public function render($datas)
	{
		extract($datas);

		$__content = preg_replace('/\{\{([^{}]+)\}\}/', '<?= $1 ?>', $this->content);

		$__tmp = __VIEW . __DS . uniqid();

		file_put_contents($__tmp, $__content);

		require $__tmp;
		unlink($__tmp);
	}

	public function getView()
	{
		return $this->content;
	}

	private static function loadTemplate($page)
	{
		$view = new View($page);
		return $view->getView();
	}
}